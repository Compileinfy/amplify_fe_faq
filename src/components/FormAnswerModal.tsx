"use client";

import { useEffect, useState } from "react";
import { listQuestionModelByFormId, listAnswerModels } from "@/app/graphql/queries";
import { client_with_token } from "@/utils/amplifyGenerateClient";
import { questionModel, answerModel } from "@/app/graphql/API";

type Props = {
  formId: string;
  userId: string;
  onClose: () => void;
};

export default function FormAnswerModal({ formId, userId, onClose }: Props) {
  const [questions, setQuestions] = useState<questionModel[]>([]);
  const [userAnswers, setUserAnswers] = useState<answerModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [qRes, aRes] = await Promise.all([
          client_with_token.graphql({
            query: listQuestionModelByFormId,
            variables: { formId },
          }),
          client_with_token.graphql({
            query: listAnswerModels,
            variables: {
              filter: {
                userId: { eq: userId },
              },
            },
          }),
        ]);

        setQuestions(qRes.data?.listQuestionModelByFormId?.items || []);
        setUserAnswers(aRes.data?.listAnswerModels?.items || []);
      } catch (error) {
        console.error("Error loading questions/answers", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [formId, userId]);

  const getAnswerForQuestion = (questionId: string): string[] => {
    const answer = userAnswers.find((a) => a.questionId === questionId);
    return (answer?.selectedOptions || []).filter(Boolean) as string[];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4">Form Questions & Answers</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((q) => (
              <li key={q.questionId}>
                <p className="font-medium">{q.question}</p>
                <ul className="pl-4 list-disc text-sm text-gray-700">
                  {getAnswerForQuestion(q.questionId).map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
