async function getUserAddresses() {
  try {
    const response = await fetch("http://localhost:8000/user/addresses", {
        cache: "no-store",
        credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return null;
  }
}

export default getUserAddresses;
