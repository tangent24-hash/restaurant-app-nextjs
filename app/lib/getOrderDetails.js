export default async function getOrderDetails(orderId = 1) {
  let value;
  await fetch(
    `${process.env.NEXT_PUBLIC_FOOD_API}/orders/${orderId}?format=json`,
    {
      cache: "no-store",
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
