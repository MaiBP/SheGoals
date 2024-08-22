"use client";
import { useState, useEffect } from "react";
import { auth } from "@/app/(auth)/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/(auth)/firebase/firebaseConfig";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch additional data from Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("User data:", docSnap.data());
          setProfileData(docSnap.data());
        } else {
          console.log("No such document!");
        }

        setLoading(false);
      } else {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">User Profile</h1>
        <p className="text-white mb-4">
          <strong>Email:</strong> {user.email}
        </p>
        <button
          onClick={() => {
            auth.signOut();
            sessionStorage.removeItem("user");
            router.push("/sign-in");
          }}
          className="w-full p-3 bg-red-600 rounded text-white hover:bg-red-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
