// src/app/page.tsx
"use client";

import QuestionForm from "@/components/QuestionForm";
import Sidebar from "@/components/Sidebar";
import QuestionList from "@/components/QuestionList";
import UpdateList from "@/components/UpdateList";
import UserList from "@/components/userslist";
import { useEffect, useState } from "react";
import { useQuestionsByFormId } from "@/hooks/useGetQuestionsByFormId";
import { useUserGroup } from "@/hooks/useUserGroup";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userGroup, setUserGroup] = useState<string | null>(null);
  const { getUserGroup } = useUserGroup();

  useEffect(() => {
    getUserGroup().then(setUserGroup);
  }, []);

  const handleShowForm = () => {
    setShowForm(true);
    setSelectedFormId(null);
    setSelectedUserId(null);
  };

  const handleSelectFormId = (formId: string) => {
    setSelectedFormId(formId);
    setShowForm(false);
    setSelectedUserId(null);
  };

  const handleViewUserAnswers = (userId: string) => {
    setSelectedUserId(userId);
    setShowForm(false);
    setSelectedFormId(null);
  };

  const handleBackToDashboard = () => {
    setSelectedUserId(null);
    setSelectedFormId(null);
    setShowForm(false);
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false);
    setSelectedFormId(null);
    setSelectedUserId(null);
  };

  const { data: questions, isLoading } = useQuestionsByFormId(selectedFormId);

  return (
    <div className="flex">
      <Sidebar
        onShowForm={handleShowForm}
        onSelectFormId={handleSelectFormId}
        onViewUserAnswers={handleViewUserAnswers}
      />

      <div className="flex-1 p-6 min-h-screen overflow-y-auto">
        {selectedUserId ? (
          <UserList
            userId={selectedUserId}
            onBackToDashboard={handleBackToDashboard}
          />
        ) : showForm ? (
          <QuestionForm
            showForm={showForm}
            onSubmitSuccess={handleFormSubmitSuccess}
          />
        ) : selectedFormId ? (
          userGroup === "ADMIN" ? (
            <UpdateList
              questions={questions || []}
              loading={isLoading}
              onBackToWelcome={handleBackToDashboard}
            />
          ) : (
            <QuestionList questions={questions || []} loading={isLoading} />
          )
        ) : (
          <h1 className="text-3xl font-bold text-gray-700 text-center mt-12">
            Welcome to HeroFAQ
          </h1>
        )}
      </div>
    </div>
  );
}
