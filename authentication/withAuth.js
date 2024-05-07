import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/authentication/AuthContext";
import Loading from "@/app/loading"; // Import your loading component

const withAuth = (Component) => {
  return (props) => {
    let { user, loading } = useContext(AuthContext);
    const router = useRouter();

    if (user || !loading) {
      // Render based on authentication state (after loading)
      return user ? (
        <Component {...props} /> // Pass user data as a prop
      ) : (
        router.push("/login") // Redirect to login if not authenticated
      );
    }

    // Display loading indicator while waiting for user data
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <Loading />
      </div>
    );
  };
};

export default withAuth;
