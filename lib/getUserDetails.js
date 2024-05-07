// lib/getUserDetails.js
async function getUserDetails(method = "GET", payload = null) {
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
}

export default getUserDetails;
