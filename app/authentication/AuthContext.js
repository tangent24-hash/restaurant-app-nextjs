"use client";

import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState(false);

  const router = useRouter();

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
        setUser(data.user);
        router.back();
      } else if (
        response.status === 400 &&
        data.non_field_errors.includes("E-mail is not verified.")
      ) {
        // Handle case where email is not verified
        setLoginError("Please verify your email address to log in.");
      } else {
        setLoginError("Unable to log in with provided credentials.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setLoginError("An unexpected error occurred. Please try again.");
    }
  };

  const signupUser = async (values) => {
    const { fullname, email, password, passwordConfirmation } = {
      ...values,
    };

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/registration/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          password1: password,
          password2: passwordConfirmation,
        }),
      }
    );

    let data = await response.json();

    if (response.status === 201) {
      setUser(data.user);
      router.back();
    }
  };

  const logoutUser = async () => {
    let response = await fetch(
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
      setUser(null);
      router.push("/");
    }
  };

  const getUser = async () => {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/user/`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let data = await response.json();

    if (response.status === 200) {
      setUser(data);
    } else {
      logoutUser();
    }
  };

  const updateToken = async () => {
    let response = await fetch(
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
      if (!user) {
        getUser();
      }
    }
    if ((loading && user) || response.status !== 200) {
      setLoading(false);
    }
  };

  let contextData = {
    loading: loading,
    user: user,
    loginError: loginError,
    loginUser: loginUser,
    logoutUser: logoutUser,
    signupUser: signupUser,
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (user) {
        updateToken();
      }
    }, fourMinutes);
    return () => {
      return clearInterval(interval);
    };
  }, [user, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
