"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { toast } from "react-toastify";

const STATUS_CHOICES = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const StatusUpdateDialog = ({ open, onClose, orderId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FOOD_API}/orders/${orderId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) {
        toast.error("Failed to update order status");
        return;
      } else if (response.ok) {
        toast.success("Order status updated successfully");
        onClose(true, await response.json()); // Pass true to indicate a successful update
      }
    } catch (error) {
      onClose(false); // Pass false to indicate an error
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false, null)}>
      <DialogTitle>Update Order Status</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={status}
            label="Status"
            onChange={handleStatusChange}
          >
            {STATUS_CHOICES.map((choice) => (
              <MenuItem key={choice.value} value={choice.value}>
                {choice.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false, null)}>Cancel</Button>
        <Button onClick={handleUpdateStatus}>Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusUpdateDialog;
