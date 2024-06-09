import { getUser } from "../api/auth";

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



// Dashboard
export const fetchFoods = async () => {
  let url = `${process.env.NEXT_PUBLIC_FOOD_API}/foods`;
  let allFoods = [];

  try {
    while (url) {
      const response = await fetch(url, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      allFoods = allFoods.concat(data.results);
      url = data.next;
    }
  } catch (error) {
    console.error("Error fetching foods:", error);
    return { results: [], error: error.message };
  }

  return { results: allFoods };
};

export const fetchOrders = async () => {
  let url = `${process.env.NEXT_PUBLIC_FOOD_API}/orders`;
  let allOrders = [];

  try {
    let user = await getUser();
    console.log("User", user);
    if (!user) {
      return { results: [], error: "User not found" };
    }

    while (url) {
      const response = await fetch(url, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      allOrders = allOrders.concat(data.results);
      url = data.next;
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { results: [], error: error.message };
  }

  return { results: allOrders };
};
