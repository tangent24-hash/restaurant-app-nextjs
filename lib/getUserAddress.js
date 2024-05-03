async function getUserAddress(id = 1) {
  try {
    const response = await fetch(`http://localhost:8000/user/addresses/${id}`, {
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

export default getUserAddress;
