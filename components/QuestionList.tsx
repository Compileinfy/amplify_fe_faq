"use client";

import { useEffect, useMemo, useState } from "react";
import { useAddAnsMutation } from "@/hooks/useAddAnsMutation";
import { useAllAnswers } from "@/hooks/useAnswerListQuery";
import { getCurrentUser } from "aws-amplify/auth";
import { v4 as uuidv4 } from "uuid";
import { useUpdateAns } from "@/hooks/useUpdateAns";
import { UpdateAnswerModelMutationVariables } from "@/app/graphql/API";
import { QLProps } from "@/types/types";


export default function QuestionList({ questions, loading, onSubmitSuccess }: QLProps) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [userId, setUserId] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUserId(user.userId);
    };
    fetchUser();
  }, []);

  const handleCheckboxChange = (questionId: string, option: string) => {
    console.log("Checkbox clicked:", questionId, option);
    setHasUserInteracted(true); // Mark that user has made changes

    setSelectedOptions((prev) => {
      console.log("Previous selected options:", prev);
      const current = prev[questionId] || [];
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option];

      console.log("Updated options for question:", questionId, updated);
      const newState = { ...prev, [questionId]: updated };
      console.log("New complete state:", newState);
      return newState;
    });
  };

  const results = useAllAnswers(userId ?? "", questions);

  // Extract the complex expression to a separate variable
  const resultsData = useMemo(() => results.map((r) => r.data), [results]);

  const resultsDataStr = useMemo(
    () => JSON.stringify(resultsData),
    [resultsData]
  );

  useEffect(() => {
    // Only update from API if user hasn't interacted yet
    if (!hasUserInteracted) {
      const latestSelections: Record<string, string[]> = {};

      results.forEach((res) => {
        if (res.data && res.data.length > 0) {
          const latest = res.data[res.data.length - 1];
          if (latest?.questionId && latest.selectedOptions) {
            setToggle(true);
            latestSelections[latest.questionId] = latest.selectedOptions.filter(
              (opt): opt is string => opt !== null
            );
          }
        }
      });

      setSelectedOptions((prev) => {
        const prevStr = JSON.stringify(prev);
        const latestStr = JSON.stringify(latestSelections);
        return prevStr === latestStr ? prev : latestSelections;
      });
    }
  }, [resultsDataStr, hasUserInteracted, results]);

  const updateAnswer = useUpdateAns();
  const addAnswer = useAddAnsMutation();

  const handleSubmit = async () => {
    if (!userId) {
      alert("User not found.");
      return;
    }

    try {
      const entries = Object.entries(selectedOptions);

      const promises = entries.map(([questionId, selectedOptionsArray]) => {
        const question = questions.find((q) => q.questionId === questionId);
        const formId = question?.formId;

        const input = {
          input: {
            answerId: uuidv4(),
            questionId,
            selectedOptions: selectedOptionsArray,
            userId,
            formId: formId ?? "",
          },
        };

        return addAnswer.mutateAsync(input);
      });

      await Promise.all(promises);

      alert("Answers submitted!");
      setHasUserInteracted(false); // Reset interaction flag after successful submit
      onSubmitSuccess?.();
    } catch (err) {
      console.error("Failed to submit answers:", err);
      alert("Submission failed.");
    }
  };

  const handleUpdate = async () => {
    if (!userId) {
      alert("User not found.");
      return;
    }

    try {
      const updatePromises = results.map((res) => {
        if (res.data && res.data.length > 0) {
          const latest = res.data[res.data.length - 1];

          if (!latest || !latest.answerId || !latest.questionId) return null;

          const input: UpdateAnswerModelMutationVariables = {
            input: {
              answerId: latest.answerId,
              questionId: latest.questionId,
              selectedOptions: selectedOptions[latest.questionId] || [],
              userId,
            },
          };

          return updateAnswer.mutateAsync(input);
        }
        return null;
      });

      await Promise.all(updatePromises.filter(Boolean));

      alert("Answers updated.");
      setHasUserInteracted(false); // Reset interaction flag after successful update
      onSubmitSuccess?.(); 
    } catch (error) {
      console.error("Error updating answers:", error);
      alert("Update failed.");
    }
  };

  if (loading) return <p className="p-4 text-gray-600">Loading questions...</p>;
  if (!questions || questions.length === 0) return <p>No questions found.</p>;

  return (
    <div className="p-4 flex flex-col max-h-[calc(100vh-120px)]">
      <h2 className="text-lg font-semibold mb-4">Questions</h2>
      <div className="overflow-y-auto pr-2 space-y-2 flex-grow">
        {questions.map((q, index) => (
          <div key={q.questionId} className="bg-gray-100 p-3 rounded shadow-sm">
            <p className="font-medium mb-2">
              <b>
                {index + 1}. {q.question}
              </b>
            </p>
            <div className="space-y-1 text-sm">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedOptions[q.questionId]?.includes(opt) || false
                    }
                    onChange={() => handleCheckboxChange(q.questionId, opt)}
                    className="accent-blue-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Submit/Update button */}
      <div className="pt-4">
        <div className="pt-4 flex justify-start">
          <button
            onClick={toggle ? handleUpdate : handleSubmit}
            className="px-6 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            {toggle ? "Update Answers" : "Submit Answers"}
          </button>
        </div>
      </div>
    </div>
  );
}
