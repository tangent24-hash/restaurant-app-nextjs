export default async function getOrders() {
  let value;
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/orders/?format=json`, {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
