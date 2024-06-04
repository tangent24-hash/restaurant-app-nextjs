export default async function getOrders(pageNumnber = 1) {
  let value;
  await fetch(
    `${process.env.NEXT_PUBLIC_FOOD_API}/orders?format=json&page=${pageNumnber}`,
    {
      cache: "no-store",
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
