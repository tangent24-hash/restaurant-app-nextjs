import Link from "next/link";
// import NavBar from "./NavBar";
import { TopBar } from "./TopBar";
import { Suspense } from "react";

const Header = () => {
  return (
    <div>
      <TopBar />

      {/* <Box
        padding={2}
        sx={{
          backgroundColor: "white",
          color: "darkslategray",
          fontSize: 36,
          fontWeight: "600",
          textAlign: "center",
          display: { md: "block" },
        }}
      > */}
        <Link href="/">
          Yummy Food
        </Link>
      {/* </Box> */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <NavBar></NavBar>
      </Suspense> */}
    </div>
  );
};

export default Header;
