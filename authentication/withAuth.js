import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/authentication/AuthContext";
import Loading from "@/app/loading"; // Import your loading component

const withAuth = (Component) => {
  return (props) => {
    let { user, loading } = useContext(AuthContext);
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState(false); // Local state for authentication

    useEffect(() => {
      // Update local state based on user and loading from context
      if (user) {
        setIsAuthenticated(true);
      }
    }, [user]); // Re-run on changes to user or loading
    console.log("user", user);
    console.log("loading", loading);
    console.log("isAuthenticated", isAuthenticated);

    if (!loading) {
      // Render based on authentication state (after loading)
      return isAuthenticated ? (
        <Component {...props} user={user} /> // Pass user data as a prop
      ) : (
        router.push("/login") // Redirect to login if not authenticated
      );
    }

    // Display loading indicator while waiting for user data
    return <Loading />;
  };
};

export default withAuth;
