// Import necessary components
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter, usePathname } from "next/navigation";

// Define the SideNav component
const SideNav = () => {
  const [selectedPage, setSelectedPage] = useState(""); // Default selected page

  const router = useRouter();
  let path = usePathname();

  // Function to handle navigation and styling of selected item
  const handleNavigation = (page) => {
    setSelectedPage(page);
    router.push(`/my-account/${page}`);
  };

  // Effect to set the selected page based on the current route
  useEffect(() => {
    path = path.split("/").pop();
    setSelectedPage(path);
  }, [path, setSelectedPage]);

  // Define navigation items
  const navItems = ["address", "password", "profile", "orders"];

  return (
    <div className="w-full md:w-60">
      <Card className="m-5 shadow-xl rounded-lg">
        {navItems.map((text) => (
          <CardContent
            key={text}
            onClick={() => handleNavigation(text)}
            sx={{
              textColor: selectedPage === text ? "white" : "black",
              borderLeft:
                selectedPage === text ? "5px solid darkslategray" : "none",
              ":hover": {
                backgroundColor: "darkslategray",
                color: "white",
              },
              padding: 2,
              cursor: "pointer",
            }}
          >
            <Typography variant="h6">
              {text.charAt(0).toUpperCase() + text.slice(1)}
            </Typography>
          </CardContent>
        ))}
      </Card>
    </div>
  );
};

export default SideNav;

// sx={{
//     backgroundColor: selected === text ? "white" : "white",
//     textColor: selected === text ? "white" : "black",
//     borderLeft:
//       selected === text ? "5px solid darkslategray" : "none",
//   }}
