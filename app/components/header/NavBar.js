"use client";
import React, { useState, useContext, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Logout from "@mui/icons-material/Logout";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AuthContext from "@/app/authentication/AuthContext"; // Update the import path as needed
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/navigation";
import getCategories from "@/app/lib/getCategories";
import SearchBar from "@/app/components/food/SearchBar";
import Link from "next/link";

export default function NavBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext); // Use your auth context here
  const [categories, setCategories] = useState(null);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(true)}
      onKeyDown={toggleDrawer(true)}
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
        {categories?.map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton href={`/category/${category.name}`}>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {isMobile && (
          <>
            <Divider sx={{ color: "darkslategray" }} />
            {user ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton href="/my-account/orders">
                    <ListItemText primary="Orders" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="/my-account/profile">
                    <ListItemText primary="My Account" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={logoutUser}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton href="/login">
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton href="/signup">
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </>
        )}
      </List>
      {isMobile && (
        <>
          <Box sx={{ p: 2 }} onClick={(e) => e.stopPropagation()}>
            <SearchBar onItemClick={() => setIsDrawerOpen(false)} />
          </Box>
          {user?.is_staff && (
            <IconButton
              color="inherit"
              href="/dashboard"
              style={{ fontSize: "medium" }}
            >
              <DashboardIcon /> Dashboard
            </IconButton>
          )}
        </>
      )}
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "darkslategray",
      }}
    >
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
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "block" } }}>
          <SearchBar />
        </Box>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "flex-end",
            flexGrow: 1,
          }}
        >
          <IconButton
            color="inherit"
            href="/cart"
            style={{ fontSize: "medium" }}
          >
            <ShoppingCart /> Cart
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {user?.is_staff && (
            <IconButton
              color="inherit"
              href="/dashboard"
              style={{ fontSize: "medium" }}
            >
              <DashboardIcon /> Dashboard
            </IconButton>
          )}
          {user ? (
            <>
              <IconButton
                color="inherit"
                href="/cart"
                style={{ fontSize: "medium" }}
              >
                <ShoppingCart /> Cart
              </IconButton>
              <IconButton
                color="inherit"
                href="/my-account/orders"
                style={{ fontSize: "medium" }}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <ReceiptIcon /> Orders
              </IconButton>
              <IconButton
                color="inherit"
                href="/my-account/profile"
                style={{ fontSize: "medium" }}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <AccountCircle /> Profile
              </IconButton>
              <IconButton
                color="inherit"
                onClick={logoutUser}
                style={{ fontSize: "medium" }}
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Logout />
              </IconButton>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Register
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
