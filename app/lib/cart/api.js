// Cart
import { getUser } from "../auth/api";

export const fetchCart = async () => {
  let value;

  try {
    let user = await getUser();
    if (!user) {
      return null;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FOOD_API}/cart/?format=json`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    value = await response.json();
    return value;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
};

export const fetchCartItems = async () => {
  let value;

  try {
    let user = await getUser();
    if (!user) {
      return null;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FOOD_API}/cart_items?format=json`,
      {
        cache: "no-store",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    value = await response.json();
    return value;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return null;
  }
};

export const removeCartItem = async (productId) => {
  let value;
  let user = await getUser();
  if (!user) {
    return null;
  }
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/cart_items/${productId}`, {
    cache: "no-store",
    method: "DELETE",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
};

export const updateCartItemQuantity = async (cartItemId, newQuantity) => {
  if (newQuantity <= 0) {
    return; // Prevent negative quantities
  }

  let value;
  let user = await getUser();
  if (!user) {
    return null;
  }
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/cart_items/${cartItemId}`, {
    cache: "no-store",
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: newQuantity }),
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
};
