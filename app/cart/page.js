"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FOOD_API}/cart_items?format=json`,
          {
            cache: "no-store",
            credentials: "include",
          }
        );
        const json = await response.json();
        setCartItems(json);
      } catch (error) {
        toast.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FOOD_API}/cart_items/${productId}`,
        {
          cache: "no-store",
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.status === 204) {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== productId)
        );
      }
    } catch (error) {
      toast.error("Error removing item from cart:", error);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      return; // Prevent negative quantities
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FOOD_API}/cart_items/${cartItemId}`,
        {
          cache: "no-store",
          credentials: "include",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (response?.status === 200) {
        const updatedCartItem = await response.json();
        setCartItems((prevCartItems) =>
          prevCartItems?.map((item) =>
            item.id === cartItemId ? updatedCartItem : item
          )
        );
      }
    } catch (error) {
      toast.error("Error updating item quantity:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.quantity * item.food_price, 0)
      .toFixed(2);
  };

  return (
    <Box className={styles.cartContainer}>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems?.map((item) => (
        <Paper key={item.id} elevation={3} className={styles.cartItem}>
          <Image src={item.food_image} alt={item.name} width={80} height={80} />
          <Typography>{item.food_name}</Typography>
          <Typography>${item.food_price.toFixed(2)}</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <RemoveIcon />
            </IconButton>
            <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
            <IconButton
              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <IconButton
            onClick={() =>
              handleRemoveFromCart(item.id, setCartItems, cartItems)
            }
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
      ))}
      {(cartItems.length === 0 && (
        <Typography variant="h5" sx={{ color: "darkslategray" }}>
          Your cart is empty
        </Typography>
      )) ||
        (cartItems.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Typography variant="h6">Total: ${calculateTotal()}</Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ backgroundColor: "darkslategray" }}
              href="/checkout"
            >
              Proceed to Checkout
            </Button>
          </Box>
        ))}
    </Box>
  );
};

export default CartPage;
