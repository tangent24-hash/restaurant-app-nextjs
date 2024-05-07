import React, { useState, useEffect } from "react";
import getUserAddress from "@/lib/getUserAddress";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { TextField, Button, Card, CardContent } from "@mui/material";

const AddressForm = ({ action, id }) => {
  const router = useRouter();
  const [address, setAddress] = useState({
    address: "",
    country: "",
    postal_code: "",
  });

  useEffect(() => {
    if (action === "edit" && id) {
      const fetchAddress = async () => {
        try {
          const res = await getUserAddress(id);
          setAddress(res);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };

      fetchAddress();
    }
  }, [action, id]);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = action === "edit" ? "PUT" : "POST";
    const url = `${process.env.NEXT_PUBLIC_USER_API}/addresses${
      action === "edit" ? "/" + id : ""
    }`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(address),
      });

      if (response.ok) {
        toast.success(
          `Address ${action === "edit" ? "updated" : "created"} successfully`
        );
        router.refresh();
      } else {
        toast.error(
          `Address ${action === "edit" ? "update" : "creation"} failed`
        );
      }
    } catch (error) {
      console.error(
        `Error ${action === "edit" ? "updating" : "creating"} address:`,
        error
      );
    }
  };

  return (
    <Card variant="outlined" className="max-w-md mx-auto my-4 p-4">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Address"
            name="address"
            value={address.address}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Country"
            name="country"
            value={address.country}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Postal Code"
            name="postal_code"
            value={address.postal_code}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            color="error"
            className="mt-4"
            sx={{ float: "right", backgroundColor: "darkslategray" }}
          >
            {action === "edit" ? "Update Address" : "Create Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
