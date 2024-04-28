export default async function getFoodItems(page = 1) {
  let value;
  await fetch(
    `${process.env.NEXT_PUBLIC_FOOD_API}/foods?format=json&page=${page}`,
    {
      cache: "no-store",
    }
  )
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
