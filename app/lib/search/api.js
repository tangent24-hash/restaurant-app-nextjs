// Search
export const fetchSearchResults = async (query) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FOOD_API}/search/?q=${query}`
  );
  const data = await response.json();
  return data;
};
