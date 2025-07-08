"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { useQuestionsByFormId } from "@/hooks/useGetQuestionsByFormId";
import { useUserGroup } from "@/hooks/useUserGroup";

import Sidebar from "@/components/Sidebar";
import QuestionForm from "@/components/QuestionForm";
import QuestionList from "@/components/QuestionList";
import UpdateList from "@/components/UpdateList";
import UserList from "@/components/userslist";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userGroup, setUserGroup] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // <-- added this

  const { getUserGroup } = useUserGroup();
  const router = useRouter();

  // ✅ Fetch authenticated user
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        setUserId(user.username);
      } catch {
        setUserId(null);
        router.push("/signin");
      }
    }
    fetchUser();
  }, [router]);

  // ✅ Fetch user group after auth
  useEffect(() => {
    if (userId) {
      getUserGroup().then(setUserGroup);
    }
  }, [userId, getUserGroup]);

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
            <QuestionList
              questions={questions || []}
              loading={isLoading}
              onSubmitSuccess={handleBackToDashboard}
            />
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
