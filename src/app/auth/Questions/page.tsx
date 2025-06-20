"use client";
import QuestionForm from "@/components/QuestionForm";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    if (!showForm) {
      setShowForm(true);
    }
    else {
      setShowForm(false);
    }
  };

  return (
    <div className="flex">
    <Sidebar onShowForm={handleShowForm}/>
    <div className="flex-1 p-6">
    <QuestionForm showForm={showForm}/>
    </div>
    </div>  
  );
}