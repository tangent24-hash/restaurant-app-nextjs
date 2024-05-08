"use client";

import Loading from "@/app/loading";
import AuthContext from "@/authentication/AuthContext";
import { Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify"; // Import for toast notifications

const AddToCart = ({ id }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false); // Track add-to-cart operation state
  const [isSuccess, setIsSuccess] = useState(false); // Track add-to-cart success
  const { user } = useContext(AuthContext);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const addToCart = async () => {
    setIsAdding(true); // Set loading state
    if (!user) {
      toast.error("Please login to add items to cart."); // Display error toast
      setIsAdding(false); // Reset loading state
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
        setIsSuccess(true); // Set success state
        toast.success("Item added to cart successfully!"); // Display success toast
      } else if (response.status === 400) {
        msg = await response.json();
        msg = msg.message;
        toast.error(msg); // Display error toast
      }
    } catch (error) {
      toast.error("Failed to add item to cart. Please try again."); // Display error toast
    } finally {
      setIsAdding(false); // Reset loading state
    }
  };

  // Reset success state on component unmount (optional)
  useEffect(() => {
    return () => setIsSuccess(false);
  }, []);

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
            <Loading />
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
