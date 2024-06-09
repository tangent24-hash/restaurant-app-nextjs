
// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// // Function to login user
// const loginUser = async (values) => {
//   try {
//     let response = await fetch(
//       `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/login/`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: values.email,
//           password: values.password,
//         }),
//       }
//     );

//     let data = await response.json();

//     if (response.status === 200) {
//       console.log("Login successful");
//       cookies().set("my-refresh-token", data.refresh, { path: "/" });
//       cookies().set("my-auth", data.access, { path: "/" });

//       return NextResponse.redirect("/", { status: 200 });
//     } else if (
//       response.status === 400 &&
//       data.non_field_errors.includes("E-mail is not verified.")
//     ) {
//       console.log("Please verify your email address to log in.");
//       return new NextResponse("Please verify your email address to log in.", {
//         status: 400,
//       });
//     } else {
//       console.log("Unable to log in with provided credentials.");
//       return new NextResponse("Unable to log in with provided credentials.", {
//         status: 400,
//       });
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     console.log("An unexpected error occurred. Please try again.");
//     return new NextResponse("An unexpected error occurred. Please try again.", {
//       status: 400,
//     });
//   }
// };

// // Function to logout user
// const logoutUser = async () => {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/logout/`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({}),
//       }
//     );

//     if (response.status === 200) {
//       console.log("Logout successful");
//       cookies().delete("my-refresh-token");
//       cookies().delete("my-auth");
//     } else {
//       console.log("Unable to log out");
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// };

// // Function to fetch user
// const fetchUser = async () => {
//   const cookieStore = cookies();
//   const accessToken = cookieStore.get("my-auth");

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/user/`,
//     {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );
//   return response;
// };

// // Function to refresh token
// const refreshToken = async () => {
//   const cookieStore = cookies();
//   const refreshToken = cookieStore.get("my-refresh-token");

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/token/refresh/`,
//     {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         refresh: refreshToken.value,
//       }),
//     }
//   );

//   if (response.status === 200) {
//     const data = await response.json();
//     cookies().set("my-auth", data.access, { path: "/" });
//     console.log("Token refreshed successfully");
//   } else {
//     console.log("Failed to refresh token");
//     throw new Error("Failed to refresh token");
//   }
// };

// // Function to get user
// const getUser = async () => {
//   try {
//     let response = await fetchUser();

//     if (response.status === 200) {
//       const data = await response.json();
//       return data;
//     } else if (response.status === 401) {
//       // Token expired or invalid, try refreshing the token
//       await refreshToken();
//       response = await fetchUser();

//       if (response.status === 200) {
//         const data = await response.json();
//         return data;
//       } else {
//         throw new Error("Unable to fetch user after token refresh");
//       }
//     } else {
//       throw new Error("Unable to fetch user");
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return null;
//   }
// };

// // Function to signup user
// const signupUser = async (values) => {
//   const { fullname, fullname_bn, email, password, passwordConfirmation } = {
//     ...values,
//   };

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_ACCOUNT_API}/auth/registration/`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email,
//           fullname,
//           fullname_bn,
//           password1: password,
//           password2: passwordConfirmation,
//         }),
//       }
//     );

//     const data = await response.json();

//     if (response.status === 201) {
//       console.log("Registration successful");
//       console.log(data);
//     } else {
//       console.log("Unable to register user");
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//     console.log("An unexpected error occurred. Please try again.");
//   }
// };

// export { loginUser, logoutUser, getUser, signupUser };

// Function to login user
export const loginUser = async (values) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      console.log("Login successful");
    } else {
      const data = await response.json();
      console.log(data.message);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Function to logout user
export const logoutUser = async () => {
  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (response.ok) {
      console.log("Logout successful");
    } else {
      const data = await response.json();
      console.log(data.message);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Function to signup user
export const signupUser = async (values) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      console.log("Registration successful");
    } else {
      const data = await response.json();
      console.log(data.message);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};


// Function to fetch user
export const getUser = async () => {
  try {
    const response = await fetch("/api/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User data fetched successfully", data);
      return data;
    } else {
      const errorData = await response.json();
      console.log("Unable to fetch user", errorData.message);
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};
