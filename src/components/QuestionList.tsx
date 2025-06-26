import { useEffect, useState } from "react";
import { useAddAnsMutation } from "@/hooks/useAddAnsMutation";
import { useAllAnswers } from "@/hooks/useAnswerListQuery";
import { getCurrentUser } from "aws-amplify/auth";
import { v4 as uuidv4 } from "uuid";
import { useUpdateAns } from "@/hooks/useUpdateAns";
import { UpdateAnswerModelMutationVariables } from "@/app/graphql/API";
import { QLProps } from "@/types/types";
import Button from "./commonComponents/Button";

export default function QuestionList({ questions, loading }: QLProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [toggle, setToggle] = useState(false);
  

    useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUserId(user.userId);
    };
    fetchUser();
  }, []);

  const handleCheckboxChange = (questionId: string, option: string) => {
    setSelectedOptions((prev) => {
      const currentSelections = prev[questionId] || [];
      const isSelected = currentSelections.includes(option);

      const updatedSelections = isSelected
        ? currentSelections.filter((o) => o !== option) // Remove if already selected
        : [...currentSelections, option]; // Add if not selected

      return {
        ...prev,
        [questionId]: updatedSelections,
      };
    });
  };

  const results = useAllAnswers(userId ?? '', questions);

// Log once when data is fetched
useEffect(() => {
  const latestSelections: Record<string, string[]> = {};

  results.forEach((res) => {
    if (res.data && res.data.length > 0) {
      const latest = res.data[res.data.length - 1];
      if (latest?.questionId && latest.selectedOptions) {
        console.log("updated")
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
}, [JSON.stringify(results.map((res) => res.data))]);

const updateAnswer = useUpdateAns();
const handleUpdate = async () => {
  if (!userId) {
    alert("User not found. Please log in.");
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
        console.log("Updating answer:", input);
        return updateAnswer.mutateAsync(input);
      }

      return null;
    });

    await Promise.all(updatePromises.filter(Boolean));

    alert("Answers updated successfully!");
  } catch (error) {
    console.error("Error updating answers:", error);
    alert("Failed to update answers.");
  }
};


  const addAnswer = useAddAnsMutation();
const handleSubmit = async () => {
  if (!userId) {
    alert("User not found. Please log in.");
    return;
  }

  try {
    const entries = Object.entries(selectedOptions); // [ [questionId, [opt1, opt2]], ... ]

    // Map each entry to a mutation call
    const promises = entries.map(([questionId, selectedOptionsArray]) => {
      const inputVariable = {
        input: {
          answerId: uuidv4(),
          questionId,
          selectedOptions: selectedOptionsArray,
          userId, // userId is guaranteed to be string here
        },
      };

      // Return the mutation promise
      return addAnswer.mutateAsync(inputVariable);
    });

    // Wait for all mutations to complete
    await Promise.all(promises);

    alert("All answers submitted successfully!");
  } catch (err) {
    console.error("Failed to submit answers:", err);
    alert("Failed to submit answers");
  }
};


  if (loading) {
    return <p className="p-4 text-sm text-gray-600">Loading questions...</p>;
  }

  if (!questions || questions.length === 0) {
    return <p className="p-4 text-sm text-gray-500">No questions available.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Questions</h2>
      <ul className="space-y-4">
        {questions.map((q) => (
          <li key={q.questionId} className="bg-gray-100 p-3 rounded shadow-sm">
            <p className="font-medium mb-2">{q.question}</p>
            {q.options?.length > 0 && (
              <div className="space-y-1 text-sm text-gray-700">
                {q.options.map((opt, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={opt}
                      checked={
                        selectedOptions[q.questionId]?.includes(opt) || false
                      }
                      onChange={() => handleCheckboxChange(q.questionId, opt)}
                      className="text-blue-600"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      <Button
        onClick={toggle ? handleUpdate : handleSubmit}
        variant="primary"
        className="mt-6"
      >
        {toggle ? "Update Answers" : "Submit Answers"}
      </Button>
    </div>
  );
}
