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

// Search
export const fetchSearchResults = async (query) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FOOD_API}/search/?q=${query}`
  );
  const data = await response.json();
  return data;
};

// Dashboard
export const fetchFoods = async () => {
  let url = `${process.env.NEXT_PUBLIC_FOOD_API}/foods`;
  let allFoods = [];

  while (url) {
    const response = await fetch(url, {
      credentials: "include",
    });
    const data = await response.json();
    allFoods = allFoods.concat(data.results);
    url = data.next;
  }

  return { results: allFoods };
};

export const fetchOrders = async () => {
  let url = `${process.env.NEXT_PUBLIC_FOOD_API}/orders`;
  let allOrders = [];

  while (url) {
    const response = await fetch(url, {
      credentials: "include",
    });
    const data = await response.json();
    allOrders = allOrders.concat(data.results);
    url = data.next;
  }

  return { results: allOrders };
};

// Reviews
export const postReview = async (reviewData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/reviews`, {
    method: "POST",
    credentials: "include",
    body: reviewData,
  });

  if (!response.ok) {
    throw new Error("Failed to post review");
  }
  return response.json();
};

export async function getFoodReviews(url) {
  let value;
  await fetch(url, {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}
