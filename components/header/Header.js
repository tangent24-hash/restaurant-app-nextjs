import { Box, Link } from "@mui/material";
import NavBar from "./NavBar";
import { TopBar } from "./TopBar";

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
      <NavBar></NavBar>
    </Box>
  );
};

export default Header;
