"use client";

import Link from "next/link";
import NavBar from "@/components/shared/Navbar";
import React, { useState } from "react";
import SignIn from "@/app/(auth)/pages/sign-in/page";
import SignUp from "@/app/(auth)/pages/sign-up/page";



const Header = () => {
const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

const handleSignUpModalOpen = () => {
  setIsSignUpModalOpen(true);
};

const handleSignUpModalClose = () => {
  setIsSignUpModalOpen(false);
};

const handleSignInModalOpen = () => {
  setIsSignInModalOpen(true);
};

const handleSignInModalClose = () => {
  setIsSignInModalOpen(false);
};
 const switchToSignIn = () => {
   handleSignUpModalClose();
   handleSignInModalOpen();
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
        <NavBar
          onLogInClick={handleSignInModalOpen}
          onSignUpClick={handleSignUpModalOpen}
        />
        <SignIn isOpen={isSignInModalOpen} onClose={handleSignInModalClose} />
        <SignUp
          isOpen={isSignUpModalOpen}
          onClose={handleSignUpModalClose}
          onSwitchToSignIn={switchToSignIn}
        />
      </div>
    </header>
  );
};

export default Header;
