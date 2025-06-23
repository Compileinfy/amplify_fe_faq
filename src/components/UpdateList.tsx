import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUpdateQuestionMutation } from "@/hooks/useUpdateQuestionMutation";
import { useDeleteFormMutation } from "@/hooks/useDeleteFormMutation";
import { useAddQuestionMutation } from "@/hooks/useAddFaqMutations";

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
  onBackToWelcome: () => void; // Add this prop
};

export default function UpdateList({ questions, loading, onBackToWelcome }: Props) {
  console.log("questions: ", questions);
  const [editedQuestions, setEditedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (questions) {
      const cloned = questions.map((q) => ({
        ...q,
        options: [...q.options],
      }));
      setEditedQuestions(cloned);
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

  const handleDeleteQuestion = (qIndex: number) => {
    setEditedQuestions((prev) => prev.filter((_, i) => i !== qIndex));
  };

  const handleAddOption = (qIndex: number) => {
    setEditedQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: [...q.options, ""] } : q
      )
    );
  };

  const { mutateAsync: submitQuestion } = useAddQuestionMutation();
  const handleAddQuestion = async () => {
    try {
      const newQuestionId = uuidv4();
      const formId = editedQuestions[0]?.formId;
      const userId = editedQuestions[0]?.userId;

      if (!formId || !userId) {
        alert("Cannot add question: missing formId or userId");
        return;
      }

      // Create the question in database immediately using the same pattern as QuestionForm
      const questionInput = {
        input: {
          formId,
          questionId: newQuestionId,
          question: "", // Empty question that user will fill
          options: [""].filter((opt) => opt?.trim()), // Single empty option, filtered
          userId,
        },
      };

      await submitQuestion(questionInput);

      // Add to local state after successful database creation
      const newQuestion: Question = {
        questionId: newQuestionId,
        question: "",
        options: [""],
        formId: formId,
        userId: userId,
      };
      
      setEditedQuestions((prev) => [...prev, newQuestion]);
      
      console.log("✅ New question added successfully");
    } catch (error) {
      console.error("❌ Error adding new question:", error);
      alert("Failed to add new question");
    }
  };

  const updateQuestion = useUpdateQuestionMutation();

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

        const variables = {
          input,
          condition: null, // or some condition if needed
        };

        return updateQuestion.mutateAsync(variables);
      });

      await Promise.all(updatePromises);

      console.log("All questions updated successfully");
      alert("Form updated!");
      
      // Navigate back to welcome page after successful update
      onBackToWelcome();
    } catch (err) {
      console.error(" Error updating form:", err);
      alert("Failed to update form.");
    }
  };

  const deleteForm = useDeleteFormMutation();
  const handleDeleteForm = async () => {
    try {
      const formId = editedQuestions[0]?.formId;
      if (!formId) {
        alert("No formId found to delete.");
        return;
      }

      const variables = {
        input: { formId },
        condition: null,
      };

      await deleteForm.mutateAsync(variables);
      alert("Form deleted successfully!");
      console.log("✅ Deleted Form ID:", formId);
      
      // Navigate back to welcome page after successful deletion
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
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              placeholder="Enter question text"
              className="w-full p-2 border border-gray-300 rounded text-gray-800 font-medium"
            />
            <button
              onClick={() => handleDeleteQuestion(qIndex)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete Question
            </button>
          </div>

          <div className="space-y-2">
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, optIndex, e.target.value)
                  }
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
            className="mt-2 px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
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

      <button
        onClick={handleDeleteForm}
        className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700"
      >
        Delete Form
      </button>
    </div>
  );
}