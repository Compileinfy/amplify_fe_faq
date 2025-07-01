"use client";

import { useEffect, useState } from "react";
import {
  listAnswerModels,
  getQuestionModel,
  listQuestionModelByFormId,
} from "@/app/graphql/queries";
import { client_with_token } from "@/utils/amplifyGenerateClient";
import { answerModel} from "@/app/graphql/API";
import { ULFormData, UserLProps } from "@/types/types";
import Button from "./commonComponents/Button";

export default function UserList({ userId, onBackToDashboard }: UserLProps) {
  const [answers, setAnswers] = useState<answerModel[]>([]);
  const [formDataMap, setFormDataMap] = useState<Record<string, ULFormData>>({});
  const [expandedForms, setExpandedForms] = useState<Set<string>>(new Set());
  const [userAnswersLoading, setUserAnswersLoading] = useState(false);

  useEffect(() => {
    async function fetchAnswersAndForms() {
      setUserAnswersLoading(true);
      setAnswers([]);
      setFormDataMap({});
      setExpandedForms(new Set());

      try {
        const res = await client_with_token.graphql({
          query: listAnswerModels,
          variables: { filter: { userId: { eq: userId } } },
        });
        const items: answerModel[] = res.data?.listAnswerModels?.items || [];
        setAnswers(items);

        const formMap: Record<string, ULFormData> = {};
        const seenFormIds = new Set<string>();

        for (const ans of items) {
          if (!ans.questionId) continue;

          const qRes = await client_with_token.graphql({
            query: getQuestionModel,
            variables: { questionId: ans.questionId },
          });

          const questionData = qRes.data?.getQuestionModel;
          const formId = questionData?.formId;
          const formTitle = questionData?.form?.title ?? formId ?? "Untitled Form";

          if (formId && !seenFormIds.has(formId)) {
            seenFormIds.add(formId);

            const questionsRes = await client_with_token.graphql({
              query: listQuestionModelByFormId,
              variables: { formId },
            });

            const questions = questionsRes.data?.listQuestionModelByFormId?.items || [];
            formMap[formId] = { title: formTitle, questions };
          }
        }

        setFormDataMap(formMap);
      } catch (err) {
        console.error("Error loading forms/questions/answers", err);
      } finally {
        setUserAnswersLoading(false);
      }
    }

    if (userId) {
      fetchAnswersAndForms();
    }
  }, [userId]);

  const toggleForm = (formId: string) => {
    setExpandedForms((prev) => {
      const updated = new Set(prev);
      if (updated.has(formId)) {
        updated.delete(formId);
      } else {
        updated.add(formId);
      }
      return updated;
    });
  };

  const getUserAnswer = (questionId: string): (string | null)[] => {
    const ans = answers.find((a) => a.questionId === questionId);
    return ans?.selectedOptions?.filter(Boolean) || [];
  };

  const formIds = Object.keys(formDataMap);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Forms Answered by User</h2>

      <Button
        onClick={onBackToDashboard}
        type="button"
        className="mb-4 px-4 py-2 text-sm bg-gray-600 rounded hover:bg-gray-500"
      >
        ← Back to Dashboard
      </Button>

      {userAnswersLoading ? (
        <div className="flex justify-center items-center h-32 text-sm text-gray-500">
          Loading Forms...
        </div>
      ) : formIds.length === 0 ? (
        <p>This user has answered any forms.</p>
      ) : (
        <ul className="space-y-4">
          {formIds.map((formId, index) => {
            const form = formDataMap[formId];
            const isOpen = expandedForms.has(formId);
            return (
              <li key={formId} className="border rounded-lg p-4 shadow">
                <div
                  className="text-blue-700 font-semibold cursor-pointer hover:underline"
                  onClick={() => toggleForm(formId)}
                >
                  Form {index + 1}: {form.title}
                </div>

                {isOpen && (
                  <ul className="mt-4 space-y-4">
                    {form.questions.map((q, idx) => {
                      const selectedAnswers = getUserAnswer(q.questionId);
                      return (
                        <li
                          key={q.questionId}
                          className="p-3 border rounded bg-gray-50"
                        >
                          <p className="font-medium mb-2">
                            Question {idx + 1}: {q.question}
                          </p>

                          <div className="pl-4 space-y-1">
                            {q.options?.map((opt, i) => (
                              <label
                                key={i}
                                className="flex items-center space-x-2 text-sm"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedAnswers.includes(opt)}
                                  disabled
                                  className="accent-blue-500"
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
