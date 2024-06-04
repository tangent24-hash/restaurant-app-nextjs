export default async function createFoodItem(method, foodItem) {
  let value;
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/foods?format=json`, {
    cache: "no-store",
    method: method,
    credentials: "include",
    body: foodItem,
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
