export default async function getFoodItems(page = 1, category = null) {
  let value;
  let url;
  if (category !== null) {
    url = `${process.env.NEXT_PUBLIC_FOOD_API}/foods?category=${category}&format=json&page=${page}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_FOOD_API}/foods?format=json&page=${page}`;
  }

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    value = await response.json();
  } catch (error) {
    console.error("Error fetching food items:", error);
    value = null; 
  }

  return value;
}
