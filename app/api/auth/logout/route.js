"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/logout/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (response.status === 200) {
      console.log("Logout successful");
      cookies().delete("my-refresh-token");
      cookies().delete("my-auth");
      return NextResponse.json({ message: "Logout successful" });
    } else {
      console.log("Unable to log out");
      return NextResponse.json(
        { message: "Unable to log out" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
