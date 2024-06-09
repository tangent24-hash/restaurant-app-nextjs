export const handleRemoveFromCart = (productId, setCartItems, cartItems) => {
  let value;
  fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/cart_items/${productId}`, {
    cache: "no-store",
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => (value = json));

  if (value.status === 204) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }
};
