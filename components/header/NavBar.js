"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";
import AuthContext from "@/authentication/AuthContext";
import { useContext, useState } from "react";
import Search from "./Search";

const pages = ["about", "contact", "cart"];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { logoutUser, user } = useContext(AuthContext);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{ backgroundColor: "darkslategray" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Search />
              {pages.map((page) => (
                <Link
                  key={page}
                  href={`/category/${page}`}
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
              <Search />
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link href="/" sx={{ textDecoration: "none", color: "inherit" }}>
              YummyFood
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link
                key={page}
                href={`/${page}`}
                sx={{ textDecoration: "none" }}
              >
                <Button
                  size="large"
                  variant="text"
                  sx={{
                    color: "white",
                    display: "block",
                    fontSize: 20,
                    fontWeight: 400,
                  }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleRoundedIcon
                  fontSize="large"
                  sx={{ color: "white" }}
                ></AccountCircleRoundedIcon>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <div>
                  <Link
                    href={`/dashboard`}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem>
                      <Typography textAlign="center">Dashboard</Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={logoutUser}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>{" "}
                </div>
              ) : (
                <div>
                  <Link
                    href={`/login`}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem>
                      <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                  </Link>
                  <Link
                    href={`/signup`}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    <MenuItem>
                      <Typography textAlign="center">Signup</Typography>
                    </MenuItem>
                  </Link>{" "}
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
