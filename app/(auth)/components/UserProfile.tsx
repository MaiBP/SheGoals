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
  lastLogin?: any;
}

const UserProfile = () => {
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
    return <p>Loading...</p>; // Add a spinner for better UX
  }

  if (!userData) {
    return <p>No user data available.</p>;
  }

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Sidebar Navigation */}
      <div className="w-1/4 p-6 bg-gray-800">
        <h2 className="text-white text-xl mb-6">User Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Button color="primary">
                My Events
              </Button>
            </li>
            <li>
              <Button color="primary">
                Settings
              </Button>
            </li>
            <li>
              <Button color="primary">
                Notifications
              </Button>
            </li>
            <li>
              <Button color="danger">
                Logout
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 p-6">
        <div className="bg-gray-800 p-10 rounded-lg shadow-xl">
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
    </div>
  );
};

export default UserProfile;
