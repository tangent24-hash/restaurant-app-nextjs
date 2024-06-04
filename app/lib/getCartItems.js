export default async function getCartItems() {
  let value;
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/cart_items?format=json`, {
    cache: "no-store",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
