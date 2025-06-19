"use client";
import QuestionForm from "@/components/QuestionForm";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
// @ts-ignore
import Signup from "@/components/signup";
import outputs from '../../amplify_outputs.json'; // ✅ Fixed import path 
Amplify.configure(outputs);

/*Amplify.configure(outputs);
function Home() {
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


/* {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <Home />
        </main>
      )}
    </Authenticator>
  );
}
*/

export default function App(){
  return(
    <Signup/> 
      
  );
}


