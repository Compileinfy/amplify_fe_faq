import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUpdateQuestionMutation } from "@/hooks/useUpdateQuestionMutation";
import { useDeleteFormMutation } from "@/hooks/useDeleteFormMutation";
import { useAddQuestionMutation } from "@/hooks/useAddFaqMutations";
import { Question, ULProps } from "@/types/types";
import Button from "./commonComponents/Button";

export default function UpdateList({
  questions,
  loading,
  onBackToWelcome,
}: ULProps) {
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

  const handleOptionChange = (
    qIndex: number,
    optIndex: number,
    newText: string
  ) => {
    setEditedQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((opt, oi) =>
                oi === optIndex ? newText : opt
              ),
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
        <Button onClick={handleAddQuestion}>Add First Question</Button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Edit Questions (Admin)
      </h2>

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
            <Button
              onClick={() => handleDeleteQuestion(qIndex)}
              variant="danger"
              className="text-sm bg-transparent px-0 py-0"
            >
              Delete Question
            </Button>
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
                <Button
                  onClick={() => handleDeleteOption(qIndex, optIndex)}
                  variant="danger"
                  className="text-sm  bg-transparent px-0 py-0"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>

          <Button
            onClick={() => handleAddOption(qIndex)}
            variant="success"
            className="text-xs mt-2"
          >
            + Add Option
          </Button>
        </div>
      ))}

      <div className="pt-4">
        <Button onClick={handleAddQuestion}>+ Add Question</Button>
      </div>

      <Button onClick={handleUpdateForm} variant="primary">
        Update Form
      </Button>

      <Button onClick={handleDeleteForm} variant="danger" className="text-white">
        Delete Form
      </Button>
    </div>
  );
}
