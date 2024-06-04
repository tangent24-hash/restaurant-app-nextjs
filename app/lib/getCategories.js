// getCategories.js
export default async function getCategories() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FOOD_API}/categories?format=json`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}
