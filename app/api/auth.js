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

const refreshToken = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/token/refresh/`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  console.log(response);
  if (response.status !== 200) {
    throw new Error("Failed to refresh token");
  }
};

const getUser = async () => {
  try {
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
