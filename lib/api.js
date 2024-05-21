// lib/api.js

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

