import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <nav style={{ padding: "1rem", background: "#f8f8f8" }}>
      <ul style={{ listStyle: "none", display: "flex", gap: "1rem" }}>
        <li>
          <Link href="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link href="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link href="/user-profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
