'use client';

import { useAddFaqMutation, useAddQuestionMutation } from "@/hooks/useAddFaqMutations";
import { v4 as uuidv4 } from "uuid"; // for generating a unique formId
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { DisplayProps, Question } from "@/types/types"; // Assuming you have a type for Question
import Button from "./commonComponents/Button";


export default function 
QuestionForm({ showForm, onSubmitSuccess  }: DisplayProps) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { questionId: uuidv4(), question: '', options: [] },
  ]);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();

  // Fetch signed-in user
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        setUserId(user.username);
      } catch {
        setUserId(null);
        router.push('/signin');
      }
    }

    fetchUser();
  }, [router]);


  const handleQuestionChange = (value: string, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

 const handleOptionChange = (
  value: string,
  questionIndex: number,
  optionIndex: number
) => {
  const newQuestions = [...questions];
  const trimmedValue = value.trim();

  // Check if the option already exists (case-insensitive match, ignoring the current index)
  const isDuplicate = newQuestions[questionIndex].options.some((opt, idx) => 
    idx !== optionIndex && opt.trim().toLowerCase() === trimmedValue.toLowerCase()
  );

  if (isDuplicate) {
    alert(`Option "${value}" is already added to Question ${questionIndex + 1}`);
    return;
  }

  newQuestions[questionIndex].options[optionIndex] = value;
  setQuestions(newQuestions);
};

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const deleteOption = (questionIndex: number, optionIndex: number) => {
    // const confirmDelete = window.confirm('Delete this option?');
    // if (!confirmDelete) return;

    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };


  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionId: uuidv4(), question: '', options: [] }
    ]);
  };

  const deleteQuestion = (index: number) => {
    // const confirmDelete = window.confirm('Are you sure you want to delete this question?');
    // if (!confirmDelete) return;

    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

const { mutateAsync: submitFaqForm } = useAddFaqMutation();
const { mutateAsync: submitQuestion } = useAddQuestionMutation();


const queryClient = useQueryClient();
const handleSubmitAll = async () => {
  if (!title.trim()) {
    alert("Title is required");
    return;
  }

  if (!userId) {
    alert("User not signed in");
    return;
  }

  if (questions.length === 0) {
    alert("At least one question is required.");
    return;
  }

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const trimmedOptions = q.options.filter((opt) => opt?.trim());

    if (!q.question.trim()) {
      alert(`Question ${i + 1} is empty.`);
      return;
    }

    if (trimmedOptions.length < 2) {
      alert(`Question ${i + 1} must have at least 2 options.`);
      return;
    }

    if (trimmedOptions.length > 5) {
      alert(`Question ${i + 1} can have a maximum of 5 options.`);
      return;
    }
  }

  const formId = uuidv4(); // Generate unique ID

  const input = {
    input: {
      formId,
      title,
      userId,
    },
  };

  try {
    const response = await submitFaqForm(input);
    console.log("Form successfully created:", response);

    for (const q of questions) {
      const questionInput = {
        input: {
          formId,
          questionId: uuidv4(),
          question: q.question,
          options: q.options.filter((opt) => opt?.trim()),
          userId,
        },
      };

      await submitQuestion(questionInput);
    }

    //Invalidate the FAQ list cache to trigger Sidebar refetch
    queryClient.invalidateQueries({ queryKey: ["faqList"] });


    alert("Form submitted successfully!");

     onSubmitSuccess();
  } catch (error) {
    console.error("Failed to create form:", error);
    alert("Error submitting form");
  }
};


if (!showForm) {
     return null; 
   }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          FAQ Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter form title here..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>
      {questions.map((q, index) => (
        <div
          key={index}
          className="p-6 border rounded-lg shadow-sm bg-white space-y-4"
        >
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium mb-1">
              Question {index + 1}
            </label>
            <Button
              onClick={() => deleteQuestion(index)}
              variant="danger"
              className="text-sm hover:underline bg-transparent px-0 py-0"
              type="button"
            >
              Delete Question
            </Button>
          </div>

          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(e.target.value, index)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />

          <div>
            {q.options.map((option, optIndex) => (
              <div key={optIndex} className="flex items-center mb-2 space-x-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(e.target.value, index, optIndex)
                  }
                  className="px-2 py-1 border rounded-md w-full"
                  placeholder={`Option ${optIndex + 1}`}
                />
                <Button
                  onClick={() => deleteOption(index, optIndex)}
                  variant="danger"
                  type="button"
                  className="text-red-500 text-sm hover:underline bg-transparent px-0 py-0"
                >
                  Delete
                </Button>
              </div>
            ))}
            <Button
              onClick={() => addOption(index)}
              type="button"
              variant="primary"
              className="text-blue-600 text-sm  px-0 py-0"
            >
              + Add Option
            </Button>
          </div>
        </div>
      ))}
      <Button onClick={addQuestion} variant="success" className="px-4 py-2">
        + Add Question
      </Button>
      &nbsp;&nbsp;&nbsp;
      <Button onClick={handleSubmitAll} variant="primary" className="px-4 py-2">
        {questions.length === 1 ? "Submit Question" : "Submit All Questions"}
      </Button>
    </div>
  );
}
