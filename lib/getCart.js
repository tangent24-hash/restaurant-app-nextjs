export default async function getCart() {
  let value;
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/cart/?format=json`, {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}


