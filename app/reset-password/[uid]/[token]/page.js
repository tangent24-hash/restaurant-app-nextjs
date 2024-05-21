"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export default function ResetPasswordConfirmation({ params }) {
  const [uid, token] = [params.uid, params.token];

  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_API}/password/reset/confirm/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_password1: newPassword1,
            new_password2: newPassword2,
            uid: uid,
            token: token,
          }),
        }
      );

      if (response.ok) {
        setMessage("Password has been reset with the new password.");
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
    router.push("/");
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
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <TextField
            id="new-password1"
            name="new-password1"
            type="password"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            label="New Password"
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
          />
          <TextField
            id="new-password2"
            name="new-password2"
            type="password"
            autoComplete="new-password"
            required
            fullWidth
            variant="outlined"
            label="Confirm New Password"
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ padding: "12px", backgroundColor: "darkslategray" }}
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
