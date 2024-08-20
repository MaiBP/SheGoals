import Link from "next/link";
import Image from "next/image";
import React from "react";
// import NavItems from "./NavItems";
// import MobileNav from "./MobileNav";
import NavBar from "@/components/shared/Navbar";

const Header = () => {
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
       <NavBar/>
      </div>
    </header>
  );
};

export default Header;
