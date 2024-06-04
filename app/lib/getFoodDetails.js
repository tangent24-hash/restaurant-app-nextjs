export default async function getFoodDetails(id) {
  let value;
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/foods/${id}?format=json`, {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
