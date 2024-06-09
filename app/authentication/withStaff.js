import { useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/app/authentication/AuthContext";
import Loading from "@/app/loading"; // Import your loading component

const withStaff = (Component) => {
  const StaffComponent = (props) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    if (user || !loading) {
      // Render based on authentication state (after loading)
      return user.is_staff ? (
        <Component {...props} /> // Pass user data as a prop
      ) : (
        router.push("/") // Redirect to home if not staff
      );
    }

    // Display loading indicator while waiting for user data
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <Loading />
      </div>
    );
  };

  StaffComponent.displayName = `withStaff(${
    Component.displayName || Component.name || "Component"
  })`;

  return StaffComponent;
};

export default withStaff;
