export default async function getFoodReviews(id) {
  let value;
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/reviews?food=${id}`, {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
