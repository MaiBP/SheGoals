import React, { useEffect, useState } from "react";
import { auth, db } from "@/app/(auth)/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@nextui-org/react";
import Image from "next/image";

interface UserData {
  displayName: string;
  email: string;
  photoURL?: string;
  role: string;
  lastLogin?: any; // Replace 'any' with a specific type like Timestamp if you want more control
}

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          console.log("No such document!");
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Or use a spinner or any other loading indicator
  }

  if (!userData) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-3xl mb-5">User Profile</h1>
        {userData.photoURL && (
          <Image
            width={100}
            height={100}
            src={userData.photoURL}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
        )}
        <p className="text-white mb-4">
          <strong>Name:</strong> {userData.displayName}
        </p>
        <p className="text-white mb-4">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="text-white mb-4">
          <strong>Role:</strong> {userData.role}
        </p>
        {userData.lastLogin && (
          <p className="text-white mb-4">
            <strong>Last Login:</strong>{" "}
            {userData.lastLogin.toDate().toLocaleString()}
          </p>
        )}
        <Button color="primary">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
