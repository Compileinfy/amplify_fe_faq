'use client';

import { useState } from 'react';

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

  if (!showForm) {
     return null; 
   }

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
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const addOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const deleteOption = (questionIndex: number, optionIndex: number) => {
    const confirmDelete = window.confirm('Delete this option?');
    if (!confirmDelete) return;

    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = (index: number) => {
    console.log(`Question ${index + 1}:`, questions[index]);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: [] }]);
  };

  const deleteQuestion = (index: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this question?');
    if (!confirmDelete) return;

    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  return (
    <div className="space-y-6">
      {questions.map((q, index) => (
        <div
          key={index}
          className="p-6 border rounded-lg shadow-sm bg-white space-y-4"
        >
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium mb-1">
              Question {index + 1}
            </label>
            <button
              onClick={() => deleteQuestion(index)}
              className="text-red-500 text-sm hover:underline"
            >
              Delete Question
            </button>
          </div>

          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(e.target.value, index)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />

          <div>
            {q.options.map((option, optIndex) => (
              <div
                key={optIndex}
                className="flex items-center mb-2 space-x-2"
              >
                <input
                  type="text"
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(e.target.value, index, optIndex)
                  }
                  className="px-2 py-1 border rounded-md w-full"
                  placeholder={`Option ${optIndex + 1}`}
                />
                <button
                  onClick={() => deleteOption(index, optIndex)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
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

          <button
            onClick={() => handleSubmit(index)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Question {index + 1}
          </button>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add Question
      </button>
    </div>
  );
}
