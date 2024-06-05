// Food Items
import { getUser } from "@/app/api/auth";

// fetch food items
export const fetchFoodItems = async (page = 1, category = null) => {
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
};

// create food item
export const createFoodItem = async (method, foodItem) => {
  let value;
  try {
    let user = await getUser();
    if (!user) {
      return null;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FOOD_API}/foods?format=json`,
      {
        cache: "no-store",
        method: method,
        credentials: "include",
        body: foodItem,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    value = await response.json();
    return value;
  } catch (error) {
    console.error("Error creating food item:", error);
    return null;
  }
};

// update food item

export const updateFoodItem = async (id, foodItem) => {
  const isFormData = foodItem instanceof FormData;

  let value;
  let user = await getUser();
  if (!user) {
    return null;
  }
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/foods/${id}`, {
    cache: "no-store",
    method: "PATCH",
    credentials: "include",

    body: isFormData ? foodItem : JSON.stringify(foodItem),
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
};

// delete food item
export const deleteFoodItem = async (id) => {
  let value;
  let user = await getUser();
  if (!user) {
    return null;
  }
  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/foods/${id}`, {
    cache: "no-store",
    method: "DELETE",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
};

// Reviews

// Reviews
export const postReview = async (reviewData) => {
  try {
    let user = await getUser();
    if (!user) {
      return null;
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FOOD_API}/reviews`,
      {
        method: "POST",
        credentials: "include",
        body: reviewData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to post review");
    }
    return response.json();
  } catch (error) {
    console.error("Error posting review:", error);
    return null;
  }
};

export async function fetchFoodReviews(url) {
  let value = null;
  await fetch(url, {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
}

// Reviews

export const fetchReviews = async (id = 1) => {
  let value;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FOOD_API}/reviews?food=${id}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    value = await response.json();
    return value;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};
