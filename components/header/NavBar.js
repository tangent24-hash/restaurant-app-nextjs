"use client";
import React, { useState, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Logout from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AuthContext from "@/authentication/AuthContext"; // Update the import path as needed
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Container,
  Divider,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext); // Use your auth context here

  const router = useRouter();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ textAlign: "center" }}
      >
        Categories
      </Typography>
      <List>
        {["Chinese", "Rice", "Snacks", "Vegetables"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton href={`/categories/${text.toLowerCase()}`}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
        <List sx={{ display: { xs: "block", md: "none" } }}>
          <Divider sx={{ color: "darkslategray" }} />
          <ListItem disablePadding>
            <Search>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </Search>
          </ListItem>
          {!user && (
            <>
              <ListItem disablePadding>
                <ListItemButton href="/login">
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton href="/register">
                  <ListItemText primary="Register" />
                </ListItemButton>
              </ListItem>
            </>
          )}
          {user && (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={logoutUser}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="My Account" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "darkslategray" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {drawerList()}
        </Drawer>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          {/* Your logo or title */}
        </Typography>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}
        >
          Yummy Food
        </Typography>
        <Search sx={{ display: { xs: "none", md: "block" } }}>
          <StyledInputBase
            placeholder="Search..."
            inputProps={{ "aria-label": "search" }}
          />
          <SearchIcon />
        </Search>
        <IconButton color="inherit" href="/cart">
          <ShoppingCart />
        </IconButton>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {user ? (
            <>
              <IconButton color="inherit" href="/account">
                <AccountCircle />
              </IconButton>
              <IconButton color="inherit" onClick={logoutUser}>
                <Logout />
              </IconButton>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </a>
              <a
                href="/register"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Register
              </a>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
// Path: components/header/NavBar.js
