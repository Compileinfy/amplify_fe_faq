"use client";

import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

interface AuthProps {
  children: React.ReactNode;
}

Amplify.configure(outputs, { ssr: true });
const Auth: React.FC<AuthProps> = ({ children }) => {
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
};

export default Auth;
