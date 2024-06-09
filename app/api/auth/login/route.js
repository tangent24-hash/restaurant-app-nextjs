"use server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/login/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    let data = await response.json();

    if (response.status === 200) {
      console.log("Login successful");
      // cookies().set("my-refresh-token", data.refresh, {
      //   path: "/",
      //   secure: true,
      //   sameSite: "None",
      // });
      // cookies().set("my-auth", data.access, {
      //   path: "/",
      //   secure: true,
      //   sameSite: "None",
      // });

      return new NextResponse(" Logged in successfully ", {
        status: 200,
        headers: response.headers,
      });
    } else if (
      response.status === 400 &&
      data.non_field_errors.includes("E-mail is not verified.")
    ) {
      console.log("Please verify your email address to log in.");
      return new NextResponse("Please verify your email address to log in.", {
        status: 400,
      });
    } else {
      console.log("Unable to log in with provided credentials.");
      return new NextResponse("Unable to log in with provided credentials.", {
        status: 400,
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    console.log("An unexpected error occurred. Please try again.");
    return new NextResponse("An unexpected error occurred. Please try again.", {
      status: 400,
    });
  }
}
