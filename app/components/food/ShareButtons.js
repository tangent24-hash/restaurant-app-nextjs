"use client";
import { IconButton } from "@mui/material";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const ShareButtons = () => {
  // Social share functions (to be implemented)
  const shareOnFacebook = () => console.log("Shared on Facebook.");
  const shareOnInstagram = () => console.log("Shared on Instagram.");
  const shareOnLinkedIn = () => console.log("Shared on LinkedIn.");
  const shareOnWhatsApp = () => console.log("Shared on WhatsApp.");
  return (
    <div className="flex">
      <IconButton onClick={shareOnFacebook}>
        <FaFacebook />
      </IconButton>
      <IconButton onClick={shareOnInstagram}>
        <FaInstagram />
      </IconButton>
      <IconButton onClick={shareOnLinkedIn}>
        <FaLinkedin />
      </IconButton>
      <IconButton onClick={shareOnWhatsApp}>
        <FaWhatsapp />
      </IconButton>
    </div>
  );
};

export default ShareButtons;
