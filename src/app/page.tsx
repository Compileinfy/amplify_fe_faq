"use client";

import QuestionForm from "@/components/QuestionForm";
import Sidebar from "@/components/Sidebar";
import QuestionList from "@/components/QuestionList";
import { useEffect, useState } from "react";
import { useQuestionsByFormId } from "@/hooks/useGetQuestionsByFormId";
import { useUserGroup } from "@/hooks/useUserGroup";
import UpdateList from "@/components/UpdateList";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [userGroup, setUserGroup] = useState<string | null>(null);
  const { getUserGroup } = useUserGroup();

  useEffect(() => {
    getUserGroup().then(setUserGroup);
  }, []);

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleSelectFormId = (formId: string) => {
    setSelectedFormId(formId);
    setShowForm(false); // hide form when selecting a FAQ
  };

  // Function to reset to welcome page
  const handleBackToWelcome = () => {
    setSelectedFormId(null);
    setShowForm(false);
  };

  // Function to handle successful form submission
  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    setSelectedFormId(null);
  };

  const { data: questions, isLoading } = useQuestionsByFormId(selectedFormId);

  return (
    <div className="flex">
      <Sidebar onShowForm={handleShowForm} onSelectFormId={handleSelectFormId} />

      <div className="flex-1 p-6 min-h-screen overflow-y-auto">
        {!showForm && !selectedFormId && (
          <h1 className="text-3xl font-bold text-gray-700 text-center mt-12">
            Welcome to HeroFAQ
          </h1>
        )}

        {showForm && (
          <QuestionForm 
            showForm={showForm} 
            onSubmitSuccess={handleFormSubmitSuccess}
          />
        )}

        {!showForm && selectedFormId && (
          <>
            {userGroup === "ADMIN" ? (
              <UpdateList
                questions={questions || []}
                loading={isLoading}
                onBackToWelcome={handleBackToWelcome}
              />
            ) : (
              <QuestionList questions={questions || []} loading={isLoading} />
            )}
          </>
        )}
      </div>
    </div>
  );
}