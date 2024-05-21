"use client";
import { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API}/password/reset/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.status === 200) {
        setMessage("Password reset e-mail has been sent.");
      } else {
        const data = await response.json();
        setError(data.detail);
      }
    } catch (error) {
      setError("An error occurred while resetting password.");
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessage("");
    setError("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            color: "#374151",
          }}
        >
          Reset Password
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPassword();
          }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            fullWidth
            variant="outlined"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "darkslategray", }}
            style={{ padding: "12px" }}
          >
            Reset Password
          </Button>
        </form>
        <Snackbar
          open={!!message || !!error}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            severity={message ? "success" : "error"}
            onClose={handleClose}
          >
            {message || error}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
}
