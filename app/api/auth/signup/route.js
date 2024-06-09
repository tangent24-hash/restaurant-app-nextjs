"use server";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { fullname, fullname_bn, email, password, passwordConfirmation } =
    await request.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/registration/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          fullname,
          fullname_bn,
          password1: password,
          password2: passwordConfirmation,
        }),
      }
    );

    const data = await response.json();

    if (response.status === 201) {
      console.log("Registration successful");
      console.log(data);
      return NextResponse.json(
        { message: "Registration successful" },
        { status: 201 }
      );
    } else {
      console.log("Unable to register user");
      return NextResponse.json(
        { message: "Unable to register user" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
