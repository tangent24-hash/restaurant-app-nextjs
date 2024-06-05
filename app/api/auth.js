// Description: API functions for user authentication

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
    } else {
      console.log("Unable to log out");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

async function refreshToken() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/token/refresh/`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    console.log("Token refreshed successfully");
  } else {
    throw new Error("Failed to refresh token");
  }
}

async function fetchUser() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/user/`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}

const getUser = async () => {
  try {
    let response = await fetchUser();

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return data;
    } else if (response.status === 401) {
      // Token expired or invalid, try refreshing the token
      try {
        const setCookieHeader = await refreshToken();

        // Retry fetching the user details after refreshing the token
        response = await fetchUser();

        if (response.status === 200) {
          const data = await response.json();

          console.log(data);
          return data;
        } else {
          console.log("Unable to fetch user");
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        console.log("Unable to fetch user");
      }
    } else {
      console.log("Unable to fetch user");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    console.log("An unexpected error occurred. Please try again.");
  }
};

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
