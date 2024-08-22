"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Make sure to import from 'next/navigation' if you're using the app directory
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/(auth)/firebase/firebaseConfig";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/sign-in"); // Redirect to sign-in page if not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>; // Or a spinner or some loading UI
  }

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
