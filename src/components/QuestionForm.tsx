'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

type DisplayProps = {
  showForm: boolean;
};

type Question = {
  question: string;
  options: string[];
};

export default function QuestionForm({ showForm }: DisplayProps) {
  const [questions, setQuestions] = useState<Question[]>([
    { question: '', options: [] },
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
        router.push('/auth/login');
      }
    }

    fetchUser();
  }, [router]);

  // Sign-out
  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/auth/login');
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  // Update question text
  const handleQuestionChange = (value: string, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;
    setQuestions(newQuestions);
  };

  // Update option text
  const handleOptionChange = (
    value: string,
    questionIndex: number,
    optionIndex: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  // Add new option to a question
  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  // Add a new blank question
  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: [] }]);
  };

  // Delete a question
  const deleteQuestion = (index: number) => {
    if (questions.length === 1) return; // prevent deleting the last question
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  // Submit handler (can be extended to backend integration)
  const handleSubmit = (index: number) => {
    console.log(`Submitted Question ${index + 1}:`, questions[index]);
    alert(`Question ${index + 1} submitted successfully!`);
  };

  if (!showForm) return null;

  return (
    <div className="space-y-6">
      {/* Header with user ID and logout */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded">
        <span className="text-sm text-gray-700">
        <strong></strong>
        </span>
        <button
          onClick={handleSignOut}
          className="text-red-600 text-sm hover:underline"
        >
          
        </button>
      </div>

      {/* Question Forms */}
      {questions.map((q, index) => (
        <div
          key={index}
          className="p-6 border rounded-lg shadow-sm bg-white space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Question {index + 1}
            </label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleQuestionChange(e.target.value, index)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

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
              </div>
            ))}
            <button
              onClick={() => addOption(index)}
              type="button"
              className="text-blue-600 hover:underline text-sm mt-2"
            >
              + Add Option
            </button>
          </div>

          {/* Submit and Delete Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => handleSubmit(index)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Question {index + 1}
            </button>
            <button
              onClick={() => deleteQuestion(index)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Add New Question Button */}
      <button
        onClick={addQuestion}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add Question
      </button>
    </div>
  );
}


