"use client";
import { fetchAddresses } from "@/app/lib/user/api";

import AddressForm from "@/app/components/address/addressForm";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const userAddresses = await fetchAddresses();
        setAddresses(userAddresses.results);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    getAddresses();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="md:col-span-2">
        <Typography variant="h4" gutterBottom>
          Addresses
        </Typography>
        {addresses?.map((address) => (
          <Card key={address.id} className="mb-4">
            <CardContent>
              <Typography variant="h6">{address.address}</Typography>
              <Typography color="textSecondary">
                {address.postal_code}
              </Typography>
              <Typography color="textSecondary">{address.country}</Typography>
              <Button
                variant="contained"
                color="warning"
                sx={{ mt: 2, backgroundColor: "darkslategray" }}
                onClick={() => setSelectedId(address.id)}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="md:col-span-1">
        <AddressForm id={selectedId} action={selectedId ? "edit" : "create"} />
      </div>
    </div>
  );
};

export default AddressPage;
