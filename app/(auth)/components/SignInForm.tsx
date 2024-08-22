import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/(auth)/firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Input, Button, Checkbox, Link } from "@nextui-org/react";
import { MailIcon } from "@/components/icons/MailIcon";
import { LockIcon } from "@/components/icons/LockIcon";

const SignInForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async (): Promise<void> => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
      if (onSuccess) onSuccess();
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      console.log({ res });
      sessionStorage.setItem("user", "true");
      if (onSuccess) onSuccess();
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Input
        autoFocus
        endContent={
          <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        endContent={
          <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="bordered"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex py-2 px-1 justify-between">
        <Checkbox classNames={{ label: "text-small" }}>Remember me</Checkbox>
        <Link color="primary" href="#" size="sm">
          Forgot password?
        </Link>
      </div>
      <Button color="primary" onClick={handleSignIn}>
        Sign In
      </Button>
      <Button
        onClick={handleGoogleSignIn}
        className="w-full p-3 mt-4 bg-red-600 rounded text-white hover:bg-red-500"
      >
        Sign In with Google
      </Button>
    </>
  );
};

export default SignInForm;
