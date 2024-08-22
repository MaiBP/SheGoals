import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/app/(auth)/firebase/firebaseConfig";
import { Input, Button } from "@nextui-org/react";

const SignUpForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async (): Promise<void> => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
      if (onSuccess) onSuccess();
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
        label="Email"
        placeholder="Enter your email"
        variant="bordered"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4"
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="bordered"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
      />
      <Button color="primary" onClick={handleSignUp} className="w-full">
        Sign Up
      </Button>
      <Button
        onClick={handleGoogleSignIn}
        className="w-full p-3 mt-4 bg-red-600 rounded text-white hover:bg-red-500"
      >
        Sign up with Google
      </Button>
    </>
  );
};

export default SignUpForm;
