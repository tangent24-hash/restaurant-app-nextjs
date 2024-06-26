// User

// Addresses

export const fetchAddresses = async () => {
  let url = `${process.env.NEXT_PUBLIC_USER_API}/addresses`;
  let allAddresses = [];

  try {
    while (url) {
      const response = await fetch(url, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      allAddresses = allAddresses.concat(data.results);
      url = data.next;
    }
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return { results: [], error: error.message };
  }

  return { results: allAddresses };
};

export const fetchUserAddress = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USER_API}/addresses/${id}`,
      {
        cache: "no-store",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { address: data };
  } catch (error) {
    console.error("Error fetching address:", error);
    return { address: null, error: error.message };
  }
};

// user details

export const fetchUserDetails = async (method = "GET", payload = null) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_USER_API}/mydetails`,
      {
        cache: "no-store",
        credentials: "include",
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: payload ? JSON.stringify(payload) : null,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching details:", error);
    return null;
  }
};
