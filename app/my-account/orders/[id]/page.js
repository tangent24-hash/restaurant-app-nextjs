"use client";
import { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import getOrderDetails from "@/lib/getOrderDetails";
import getUserAddress from "@/lib/getUserAddress";
import withAuth from "@/authentication/withAuth";

const OrderDetailsPage = ({ params }) => {
  const orderId = params.id;
  const [orderDetails, setOrderDetails] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const details = await getOrderDetails(orderId);
      setOrderDetails(details);
      if (details.address) {
        const addressDetails = await getUserAddress(details.address);
        setAddress(addressDetails);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails || !address)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  // Calculate total quantity
  const totalQuantity = orderDetails.order_items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <Grid container spacing={2} className="my-4">
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="p-4 shadow-lg">
            <Typography variant="h5" className="font-bold text-gray-700 mb-2">
              Order # {orderDetails.id}
            </Typography>
            <Typography variant="subtitle1" className="mb-2 text-gray-600">
              Order Date:{" "}
              <strong>
                {new Date(orderDetails.created_date).toLocaleString()}
              </strong>
            </Typography>
            <Typography variant="subtitle1" className="mb-4">
              Status:{" "}
              <span className={`status-badge status-${orderDetails.status}`}>
                {orderDetails.status}
              </span>
            </Typography>
            <Typography variant="h6" className="font-bold mb-3 text-gray-700">
              Shipping Details:
            </Typography>
            <Typography variant="subtitle1" className="mb-2 text-gray-600">
              Country: <strong>{address.country}</strong>
            </Typography>
            <Typography variant="subtitle1" className="mb-2 text-gray-600">
              Postal Code: <strong>{address.postal_code}</strong>
            </Typography>
            <Typography variant="subtitle1" className="mb-2 text-gray-600">
              Address: <strong>{address.address}</strong>
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} className="p-4 shadow-lg">
            <Typography variant="h5" className="font-bold mb-3 text-gray-700">
              Order Items
            </Typography>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1" className="text-gray-700">
                Name
              </Typography>
              <Typography variant="subtitle1" className="text-gray-700">
                Price
              </Typography>
              <Typography variant="subtitle1" className="text-gray-700">
                Quantity
              </Typography>
            </Box>
            <Divider className="my-4" />
            {orderDetails.order_items.map((item) => (
              <Box
                display="flex"
                justifyContent="space-between"
                key={item.id}
                mb={2}
              >
                <Typography variant="body1" className="text-gray-700">
                  {item.food_name}
                </Typography>
                <Typography variant="body1" className="text-gray-700">
                  ${item.food_price.toFixed(2)}
                </Typography>
                <Typography variant="body1" className="text-gray-700">
                  {item.quantity}
                </Typography>
              </Box>
            ))}
            <Divider className="my-4" />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1" className="text-gray-700">
                Total
              </Typography>
              <Typography variant="subtitle1" className="text-gray-700">
                ${orderDetails.total_amount.toFixed(2)}
              </Typography>
              <Typography variant="subtitle1" className="text-gray-700">
                {totalQuantity}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default withAuth(OrderDetailsPage);
