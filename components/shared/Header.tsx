
"use client";

import Link from "next/link";
import NavBar from "@/components/shared/Navbar";
import React, { useState } from "react";
import SignIn from "@/app/(auth)/sign-in/page";



const Header = () => {

   const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

   const handleSignInModalOpen = () => {
     setIsSignInModalOpen(true);
   };
  const handleSignInModalClose = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href="/" className="w-36">
          {/* <Image
            src="/assets/images/UFS_logoCircular.svg"
            width={100}
            height={35}
            alt="Evently logo"
          /> */}
        </Link>
        <NavBar onLogInClick={handleSignInModalOpen} />
        <SignIn isOpen={isSignInModalOpen} onClose={handleSignInModalClose} />
      </div>
    </header>
  );
};

export default Header;
