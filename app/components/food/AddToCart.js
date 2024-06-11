"use client";

import AuthContext from "@/app/authentication/AuthContext";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";

const AddToCart = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const addToCart = async () => {
    setIsAdding(true);
    if (!user) {
      toast.error("Please login to add items to cart.");
      setIsAdding(false);
      return;
    }
    let msg;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FOOD_API}/cart_items`,
        {
          cache: "no-store",
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ food: id, quantity: quantity }),
        }
      );

      if (response.status === 201) {
        toast.success("Item added to cart successfully!");
      } else if (response.status === 400) {
        msg = await response.json();
        msg = msg.message;
        toast.error(msg);
      }
    } catch (error) {
      toast.error("Failed to add item to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
        className="border p-2 mr-4 w-16"
      />

      <Button
        className={`${isAdding ? "cursor-wait" : ""}`}
        onClick={addToCart}
        disabled={isAdding}
        variant="contained"
        color="error"
        sx={{ backgroundColor: "darkslategray" }}
      >
        {isAdding ? (
          <span className="mr-2">
            <CircularProgress color="error" size={20} thickness={6} />
          </span>
        ) : (
          <>
            <FaCartPlus className="mr-2" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
};

export default AddToCart;
