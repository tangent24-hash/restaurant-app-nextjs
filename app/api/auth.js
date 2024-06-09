"use server";
import { cookies } from "next/headers";

// Function to set cookies
const setCookie = (name, value, options = {}) => {
  const cookieOptions = {
    path: "/",
    ...options,
  };

  const cookieStr = `${name}=${value}; ${Object.entries(cookieOptions)
    .map(([key, val]) => `${key}=${val}`)
    .join("; ")}`;

  console.log(`Setting cookie: ${cookieStr}`); // Add logging
  cookies().set(cookieStr);
};

// Function to delete cookies
const deleteCookie = (name) => {
  setCookie(name, "", { "Max-Age": -1 });
};

// Function to login user
const loginUser = async (values) => {
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/login/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      }
    );

    let data = await response.json();

    if (response.status === 200) {
      console.log("Login successful");
      setCookie("my-auth", data.access, {
        "Max-Age": 3000,
        SameSite: "None",
        Secure: true,
      });
      setCookie("my-refresh-token", data.refresh, {
        "Max-Age": 86400,
        SameSite: "None",
        Secure: true,
      });
      console.log(data);
      console.log("Access Token:", data.access);
      console.log("Refresh Token:", data.refresh);
      console.log(setCookie("my-auth", data.access));
      console.log(setCookie("my-refresh-token", data.refresh));
      console.log("User:", await getUser());
      console.log('refresh token:', cookies().get('my-refresh-token'));
      console.log('access token:', cookies().get('my-auth'));
    } else if (
      response.status === 400 &&
      data.non_field_errors.includes("E-mail is not verified.")
    ) {
      console.log("Please verify your email address to log in.");
    } else {
      console.log("Unable to log in with provided credentials.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    console.log("An unexpected error occurred. Please try again.");
  }
};

// Function to logout user
const logoutUser = async () => {
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
      deleteCookie("my-auth");
      deleteCookie("my-refresh-token");
    } else {
      console.log("Unable to log out");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Function to fetch user
const fetchUser = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/user/`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return response;
};

// Function to refresh token
const refreshToken = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/token/refresh/`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    console.log(`Refresh token response status: ${response.status}`); // Add logging

    if (response.status !== 200) {
      const errorData = await response.json();
      console.log("Failed to refresh token response body:", errorData); // Add logging
      throw new Error("Failed to refresh token");
    }

    const data = await response.json();
    console.log("New access token:", data.access); // Add logging

    // Set the new access token in the cookie
    setCookie("my-auth", data.access, {
      "Max-Age": 300,
      SameSite: "None",
      Secure: true,
    });
  } catch (error) {
    console.error("Error refreshing token:", error); // Add logging
    throw error;
  }
};

// Function to get user
const getUser = async () => {
  try {
    let response = await fetchUser();

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else if (response.status === 401) {
      // Token expired or invalid, try refreshing the token
      await refreshToken();
      response = await fetchUser();

      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Unable to fetch user after token refresh");
      }
    } else {
      throw new Error("Unable to fetch user");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

// Function to signup user
const signupUser = async (values) => {
  const { fullname, fullname_bn, email, password, passwordConfirmation } = {
    ...values,
  };

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
    } else {
      console.log("Unable to register user");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    console.log("An unexpected error occurred. Please try again.");
  }
};

export { loginUser, logoutUser, getUser, signupUser };
