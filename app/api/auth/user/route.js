"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const fetchUserFromAPI = async (accessToken) => {
  return fetch(`${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    cache: "no-store",
  });
};

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("my-auth");
  const refreshToken = cookieStore.get("my-refresh-token");
  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);
  try {
    let response = await fetchUserFromAPI(accessToken?.value);

    if (response.status === 200) {
      const data = await response.json();
      console.log("data", data);
      return NextResponse.json(data);
    } else if (response.status === 401 && refreshToken) {
      // Token expired or invalid, try refreshing the token
      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/token/refresh/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // revalidate: 60,
          body: JSON.stringify({
            refresh: refreshToken.value,
          }),
          credentials: "include",
        }
      );

      if (refreshResponse.status === 200) {
        const refreshData = await refreshResponse.json();
        cookies().set("my-auth", refreshData?.access, {
          path: "/",
          expires: new Date(refreshData?.access_expiration),
          secure: true,
          sameSite: "None",
          httpOnly: true,
        });

        // Retry fetching the user with the new access token
        response = await fetchUserFromAPI(refreshData?.access);

        if (response.status === 200) {
          const data = await response.json();
          return NextResponse.json(data);
        }
      }
    }

    throw new Error("Unable to fetch user");
  } catch (error) {
    console.log("An error occurred:", error);
    return new NextResponse("An error occurred while fetching the user", {
      status: 500,
    });
  }
}
