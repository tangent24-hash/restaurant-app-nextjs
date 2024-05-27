export async function verifyEmail(key) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_API}/registration/verify-email/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key }),
      }
    );

    if (res.ok) {
      return { success: true };
    } else {
      const errorData = await res.json();
      return {
        success: false,
        error: `Verification failed: ${errorData.detail}`,
      };
    }
  } catch (error) {
    return { success: false, error: "An error occurred while verifying email" };
  }
}

export async function searchFoodItems(keyword) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FOOD_API}/search/?q=${keyword}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error searching food items:", error);
    return [];
  }
}

export const fetchSearchResults = async (query) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FOOD_API}/search/?q=${query}`
  );
  const data = await response.json();
  return data;
};
