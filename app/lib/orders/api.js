// Orders

export const fetchOrders = async (pageNumnber = 1) => {
  let value;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FOOD_API}/orders?format=json&page=${pageNumnber}`,
      {
        cache: "no-store",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    value = await response.json();
    return value;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return null;
  }
};

export const fetchOrderDetails = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FOOD_API}/orders/${id}`,
      {
        cache: "no-store",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { order: data };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { order: null, error: error.message };
  }
};

export const updateOrderStatus = async (id, status) => {
  let value;

  await fetch(`${process.env.NEXT_PUBLIC_FOOD_API}/orders/${id}`, {
    cache: "no-store",
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
    .then((response) => response.json())
    .then((json) => (value = json));
  return value;
};
