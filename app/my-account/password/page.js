"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import withAuth from "@/app/authentication/withAuth";

const ChangePasswordPage = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const passwordScore = zxcvbn(newPassword).score;
    if (passwordScore < 2) {
      toast.error("Password is too weak.");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_AUTH_API}/password/change/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          new_password1: newPassword,
          new_password2: confirmPassword,
        }),
      }
    );

    if (response.ok) {
      toast.success("Password changed successfully");
      router.push("/my-account/profile");
    } else {
      toast.error("Failed to change password", error);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    const passwordStrength = zxcvbn(newPassword).score;
    setPasswordStrength(passwordStrength);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 1) return "error";
    if (passwordStrength < 3) return "warning";
    return "success";
  };

  return (
    <Card variant="outlined" className="max-w-md mx-auto my-8 p-4">
      <CardContent>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: 4, color: "darkslategray" }}
          gutterBottom
        >
          Change Password
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={handlePasswordChange}
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { borderColor: "darkslategray" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "darkslategray",
                },
                "&:hover fieldset": {
                  borderColor: "darkslategray",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "darkslategray",
                },
                "&.Mui-error fieldset": {
                  borderColor: "error.main",
                },
              },
            }}
          />

          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            variant="outlined"
            error={newPassword !== confirmPassword}
            helperText={
              newPassword !== confirmPassword && "Passwords do not match"
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
              style: { borderColor: "darkslategray" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    newPassword !== confirmPassword
                      ? "error.main"
                      : "darkslategray",
                },
                "&:hover fieldset": {
                  borderColor:
                    newPassword !== confirmPassword
                      ? "error.main"
                      : "darkslategray",
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    newPassword !== confirmPassword
                      ? "error.main"
                      : "darkslategray",
                },
              },
            }}
          />
          <LinearProgress
            variant="determinate"
            value={(passwordStrength / 4) * 100}
            color={getPasswordStrengthColor()}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "darkslategray",
              "&:hover": {
                backgroundColor: "darkslategray",
              },
            }}
            className="w-full"
          >
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default withAuth(ChangePasswordPage);
