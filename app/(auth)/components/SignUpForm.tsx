import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/(auth)/firebase/firebaseConfig";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Input, Button } from "@nextui-org/react";

interface SignUpFormProps {
  onSuccess?: () => void;
}

const SignUpForm = ({ onSuccess }: SignUpFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async (): Promise<void> => {
    try {
      const res: UserCredential | undefined =
        await createUserWithEmailAndPassword(email, password);

      if (!res) {
        throw new Error("Failed to create user");
      }

      const user = res.user;

      // Add user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName || "Anonymous",
        email: user.email,
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        role: "user",
      });

      sessionStorage.setItem("user", "true");
      setEmail("");
      setPassword("");
      if (onSuccess) onSuccess();
      router.push("/"); 
    } catch (e) {
      console.error("Error signing up:", e);
    }
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      if (!res) {
        throw new Error("Failed to sign in with Google");
      }

      const user = res.user;

      // Add user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        displayName: user.displayName || "Anonymous",
        email: user.email,
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        role: "user",
      });

      sessionStorage.setItem("user", "true");
      if (onSuccess) onSuccess();
      router.push("/user-profile"); 
    } catch (e) {
      console.error("Error signing in with Google:", e);
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
