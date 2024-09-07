"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Link,
} from "@nextui-org/react";
import SignUpForm from "@/app/(auth)/components/SignUpForm";

interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignIn: () => void; // New prop to switch to the sign-in modal
}

const SignUp = ({ isOpen, onClose, onSwitchToSignIn }: SignUpProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
        <ModalBody>
          <SignUpForm onSuccess={onClose} />
        </ModalBody>
        <ModalHeader className="flex flex-col gap-1">
          Already have an account?{" "}
          <Link href="#" onClick={onSwitchToSignIn}>
            Log in
          </Link>
        </ModalHeader>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignUp;
