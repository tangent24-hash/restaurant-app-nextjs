"use client";
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Paper } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import withAuth from "@/authentication/withAuth";

const CartItem = styled(Paper)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "1rem",
  alignItems: "center",
  padding: "1rem",
  marginBottom: "1rem",
  borderBottom: "1px solid #e0e0e0",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(2, auto)",
    padding: "1rem",
    gap: "0.5rem",
  },
}));

const CartContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingLeft: theme.spacing(17),
  paddingRight: theme.spacing(17),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
  },
}));

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

      if (response.status === 200) {
        const updatedCartItem = await response.json();
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
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
    <CartContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItems.map((item) => (
        <CartItem key={item.id} elevation={3}>
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
        </CartItem>
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
    </CartContainer>
  );
};

export default withAuth(CartPage);
