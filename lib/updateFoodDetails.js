export default async function updateFoodDetails(id, foodItem) {
  const isFormData = foodItem instanceof FormData;

  let value;
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/foods/${id}`, {
    cache: "no-store",
    method: "PATCH", // "PATCH" is used to update an existing resource
    credentials: "include",

    body: isFormData ? foodItem : JSON.stringify(foodItem),
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
