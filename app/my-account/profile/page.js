"use client";
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Avatar,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { fetchUserDetails } from "@/app/lib/user/api";
import { toast } from "react-toastify";
import Loading from "@/app/loading";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getUserDetails = async () => {
      const userDetails = await fetchUserDetails();
      setProfile(userDetails);
    };

    getUserDetails();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the profile
      const updatedProfile = await fetchUserDetails("PUT", profile);
      if (!updatedProfile) {
        toast.error("Error updating profile");
      } else {
        setProfile(updatedProfile);
        toast.success("Profile updated");
        setEditMode(false);
      }
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  if (!profile) {
    return <Loading />;
  }

  return (
    <Container
      maxWidth="md"
      className="bg-darkslategray flex flex-col justify-center p-4"
    >
      <Paper elevation={3} className="p-4">
        {!editMode ? (
          <>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar
                src={
                  profile.profilePic || "/assets/avatars/avatar with crown.png"
                }
              >
                {!profile.profilePic && profile.fullname[0]}
              </Avatar>
              <Typography variant="h5">{profile.fullname}</Typography>
            </div>
            <Typography variant="body1">
              <strong>Email:</strong> {profile.email}
            </Typography>
            <Typography variant="body1">
              <strong>Bio:</strong> {profile.bio}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {profile.date_of_birth}
            </Typography>
            <Button
              variant="contained"
              style={{ backgroundColor: "darkslategrey" }}
              startIcon={<EditIcon />}
              onClick={handleEditToggle}
              className="mt-4"
            >
              Edit Profile
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <TextField
              label="Full Name"
              variant="outlined"
              name="fullname"
              value={profile.fullname}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Bio"
              variant="outlined"
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
            />
            <TextField
              label="Date of Birth"
              variant="outlined"
              name="date_of_birth"
              type="date"
              value={profile.date_of_birth}
              onChange={handleInputChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "darkslategrey" }}
              className="mt-4"
            >
              Save Changes
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
}
