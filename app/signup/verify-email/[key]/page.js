"use client";
import { CircularProgress, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { verifyEmail } from "@/app/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmail({ params }) {
  const key = decodeURIComponent(params.key);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!key) {
        setError("No verification key provided.");
        setLoading(false);
        router.push("/");
        return;
      }

      const { success, error: errorMessage } = await verifyEmail(key);

      if (success) {
        setMessage("Email verified successfully!");
        setTimeout(() => {
          window.location.href = "/login"; // Redirect to login page after verification
        }, 3000); // Redirect after 3 seconds
      } else {
        setError(errorMessage);
      }

      setLoading(false);
    };

    fetchData();
  }, [key]);

  return (
    <div>
      {loading && <CircularProgress />} {/* Show loading indicator */}
      {!loading && (message || error) && (
        <Snackbar open={true} autoHideDuration={6000}>
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={message ? "success" : "error"}
          >
            {message || error}
          </MuiAlert>
        </Snackbar>
      )}
    </div>
  );
}
