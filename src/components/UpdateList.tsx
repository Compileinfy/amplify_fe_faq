import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUpdateQuestionMutation } from "@/hooks/useUpdateQuestionMutation";
import { useDeleteFormMutation } from "@/hooks/useDeleteFormMutation";
import { useAddQuestionMutation } from "@/hooks/useAddFaqMutations";
import { useDeleteQuestionMutation } from "@/hooks/useDeleteFormMutation"; // Assuming this deletes a single question

type Question = {
  questionId: string;
  question: string;
  options: string[];
  userId?: string;
  formId?: string;
};

type Props = {
  questions: Question[];
  loading: boolean;
  onBackToWelcome: () => void;
};

export default function UpdateList({ questions, loading, onBackToWelcome }: Props) {
  const [editedQuestions, setEditedQuestions] = useState<Question[]>([]);
  const [formId, setFormId] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>();

  const { mutateAsync: submitQuestion } = useAddQuestionMutation();
  const updateQuestion = useUpdateQuestionMutation();
  const deleteForm = useDeleteFormMutation();
  const deleteQuestion = useDeleteQuestionMutation();

  useEffect(() => {
    if (questions?.length) {
      const cloned = questions.map((q) => ({
        ...q,
        options: [...q.options],
      }));
      setEditedQuestions(cloned);
      setFormId(questions[0].formId);
      setUserId(questions[0].userId);
    }
  }, [questions]);

  const handleQuestionChange = (index: number, newText: string) => {
    setEditedQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, question: newText } : q))
    );
  };

  const handleOptionChange = (qIndex: number, optIndex: number, newText: string) => {
    setEditedQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((opt, oi) => (oi === optIndex ? newText : opt)),
            }
          : q
      )
    );
  };

  const handleDeleteOption = (qIndex: number, optIndex: number) => {
    setEditedQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? { ...q, options: q.options.filter((_, oi) => oi !== optIndex) }
          : q
      )
    );
  };

  const handleDeleteQuestion = async (qIndex: number) => {
    const questionToDelete = editedQuestions[qIndex];
    const confirmed = window.confirm("Are you sure you want to delete this question?");
    if (!confirmed) return;

    try {
      if (questionToDelete?.questionId) {
        await deleteQuestion.mutateAsync({
          input: { questionId: questionToDelete.questionId },
          condition: null,
        });
      }

      setEditedQuestions((prev) => {
        const updated = prev.filter((_, i) => i !== qIndex);
        return updated;
      });

      console.log("✅ Question deleted");
    } catch (error) {
      console.error("❌ Failed to delete question:", error);
      alert("Failed to delete question.");
    }
  };

  const handleAddOption = (qIndex: number) => {
    setEditedQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const handleAddQuestion = async () => {
    try {
      if (!formId || !userId) {
        alert("Cannot add question: missing formId or userId");
        return;
      }

      const newQuestionId = uuidv4();

      const questionInput = {
        input: {
          formId,
          questionId: newQuestionId,
          question: "",
          options: [""],
          userId,
        },
      };

      await submitQuestion(questionInput);

      const newQuestion: Question = {
        questionId: newQuestionId,
        question: "",
        options: [""],
        formId,
        userId,
      };

      setEditedQuestions((prev) => [...prev, newQuestion]);
    } catch (error) {
      console.error("❌ Error adding question:", error);
      alert("Failed to add question.");
    }
  };

  const handleUpdateForm = async () => {
    try {
      const updatePromises = editedQuestions.map((question) => {
        const input = {
          questionId: question.questionId,
          question: question.question,
          options: question.options,
          formId: question.formId,
          userId: question.userId,
        };

        return updateQuestion.mutateAsync({ input, condition: null });
      });

      await Promise.all(updatePromises);
      alert("Form updated!");
      onBackToWelcome();
    } catch (err) {
      console.error("Error updating form:", err);
      alert("Failed to update form.");
    }
  };

  const handleDeleteForm = async () => {
    try {
      if (!formId) {
        alert("No formId found to delete.");
        return;
      }

      await deleteForm.mutateAsync({
        input: { formId },
        condition: null,
      });

      alert("Form deleted successfully!");
      onBackToWelcome();
    } catch (err) {
      console.error("❌ Failed to delete form:", err);
      alert("Error deleting form.");
    }
  };

  if (loading) {
    return <p className="p-4 text-sm text-gray-600">Loading questions...</p>;
  }

  if (!editedQuestions.length) {
    return (
      <div className="p-4 space-y-4">
        <p className="text-gray-500 text-sm">No questions found.</p>
        <button
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          Add First Question
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Questions (Admin)</h2>

      {editedQuestions.map((q, qIndex) => (
        <div
          key={q.questionId}
          className="bg-white shadow rounded p-4 space-y-3 border border-gray-200"
        >
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-semibold text-gray-700">
                Question {qIndex + 1}
              </h3>
              <button
                onClick={() => handleDeleteQuestion(qIndex)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete Question
              </button>
            </div>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder="Enter question text"
              className="w-full p-2 border border-gray-300 rounded text-gray-800 font-medium"
            />
          </div>

          <div className="space-y-2">
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                  placeholder="Enter option"
                  className="w-full p-2 border border-gray-200 rounded text-sm text-gray-700"
                />
                <button
                  onClick={() => handleDeleteOption(qIndex, optIndex)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => handleAddOption(qIndex)}
            disabled={q.options.length >= 5}
            className={`mt-2 px-3 py-1 text-xs rounded ${
              q.options.length >= 5
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            + Add Option
          </button>
        </div>
      ))}

      <div className="pt-4">
        <button
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          + Add Question
        </button>
      </div>

      <button
        onClick={handleUpdateForm}
        className="px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
      >
        Update Form
      </button>
      &nbsp;&nbsp;&nbsp;
      <button
        onClick={handleDeleteForm}
        className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
      >
        Delete Form
      </button>
    </div>
  );
}
