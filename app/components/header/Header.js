import { Box, Link } from "@mui/material";
import NavBar from "./NavBar";
import { TopBar } from "./TopBar";
import { Suspense } from "react";

const Header = () => {
  return (
    <Box>
      <TopBar />

      <Box
        padding={2}
        sx={{
          backgroundColor: "white",
          color: "darkslategray",
          fontSize: 36,
          fontWeight: "600",
          textAlign: "center",
          display: { md: "block" },
        }}
      >
        <Link href="/" sx={{ textDecoration: "none", color: "inherit" }}>
          Yummy Food
        </Link>
      </Box>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar></NavBar>
      </Suspense>
    </Box>
  );
};

export default Header;
