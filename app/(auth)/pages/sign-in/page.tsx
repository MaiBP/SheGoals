"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import SignInForm from "@/app/(auth)/components/SignInForm";

const SignIn: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
        <ModalBody>
          <SignInForm onSuccess={onClose} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignIn;
