import { Box, Link } from "@mui/material";
import NavBar from "./NavBar";
import { TopBar } from "./TopBar";
// import AnnouncementBar from "./AnnouncementBar";
import Search from "./Search";

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
          display: { xs: "none", md: "block" },
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
