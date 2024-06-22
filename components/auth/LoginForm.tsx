"use client";

import AuthCard from "./AuthCard";

const LoginForm = () => {
  return (
    <AuthCard
      cardTitle="Welcome back!"
      backButtonHref="/auth/register"
      backButtonLabel="Create a new Account"
      showSocials
    >
      <div></div>
    </AuthCard>
  );
};
export default LoginForm;
