"use client";

import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Input,
  Button,
} from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import { auth } from "@/app/(auth)/firebase/firebaseConfig"; // Adjust the path based on your structure
import { onAuthStateChanged, signOut } from "firebase/auth";

interface NavBarProps {
  onLogInClick: () => void;
  onSignUpClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLogInClick, onSignUpClick }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // console.log(currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">SheGoals</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="/my-events">
              My Events
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/my-team">
              My Team
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search..."
          size="sm"
          startContent={
            <SearchIcon
              size={18}
              isActive={searchActive}
              activeColor="blue"
              inactiveColor="gray"
              onClick={() => setSearchActive(!searchActive)} // Toggle active state
            />
          }
          type="search"
        />

        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src={
                  user.photoURL ||
                  "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                } // Use user's photo or a default one
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user.email}</p>
              </DropdownItem>
              <DropdownItem key="my-events">
                <Link href="/my-events">My Events</Link>
              </DropdownItem>
              <DropdownItem key="my-team">
                <Link href="/my-team">My Team</Link>
              </DropdownItem>
              <DropdownItem key="profile">
                <Link href="/user-profile">Profile</Link>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link href="/settings">Settings</Link>
              </DropdownItem>
              <DropdownItem key="help">
                <Link href="/help">Help</Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <Button as={Link} onPress={onSignUpClick} color="primary">
              Sign up
            </Button>
            <Button onPress={onLogInClick} as={Link} color="secondary">
              Log in
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
