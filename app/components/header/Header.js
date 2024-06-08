import Link from "next/link";
import NavBar from "./NavBar";
import { TopBar } from "./TopBar";

const Header = async () => {
  return (
    <div>
      <TopBar />

      <div
        style={{ color: "darkslategrey" }}
        className="p-8 bg-white text-3xl font-semibold text-center md:block"
      >
        <Link href="/">Yummy Food</Link>
      </div>
      <NavBar user></NavBar>
    </div>
  );
};

export default Header;
