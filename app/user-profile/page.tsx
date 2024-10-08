"use client";

import React from "react";
import ProtectedRoute from "@/app/(auth)/components/ProtectedRoute";
import UserProfile from "@/app/(auth)/components/UserProfile";

const UserProfilePage = () => {
  return (
    <ProtectedRoute>
      <UserProfile />
    </ProtectedRoute>
  );
};

export default UserProfilePage;
