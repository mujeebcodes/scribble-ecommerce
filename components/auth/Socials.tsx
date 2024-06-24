"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <Button
        variant="outline"
        onClick={() => signIn("google", { redirect: false, callbackUrl: "/" })}
        className="flex gap-4 w-full"
      >
        <p>Sign in with Google</p>
        <FcGoogle />
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn("github", { redirect: false, callbackUrl: "/" })}
        className="flex gap-4 w-full"
      >
        <p>Sign in with Github</p>
        <FaGithub />
      </Button>
    </div>
  );
};
export default Socials;
