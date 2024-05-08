export default async function getFoodItems(page = 1, category = null) {
  let value;
  let url;
  if (category !== null) {
    url = `${process.env.NEXT_PUBLIC_FOOD_API}/foods?category=${category}&format=json&page=${page}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_FOOD_API}/foods?format=json&page=${page}`;
  }
  await fetch(url, {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
