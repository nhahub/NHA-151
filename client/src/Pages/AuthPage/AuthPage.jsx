import React from "react";
import { SignupForm } from "./Auth/AuthCard";

export default function AuthPage({ defaultMode }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-lime-200 h-svh md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm defaultMode={defaultMode} />
      </div>
    </div>
  );
}
