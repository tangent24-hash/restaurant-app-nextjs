"use client";
import { useState, useEffect } from "react";
import { fetchAddresses } from "../lib/user/api";

import {
  Button,
  Card,
  CardContent,
  Typography,
  Radio,
  FormControlLabel,
  RadioGroup,
  Container,
  Grid,
} from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CheckoutForm from "@/app/components/checkout/checkoutForm";
import { getUser } from "../api/client-auth";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [clientSecret, setClientSecret] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        if (!userData) {
          router.push("/login");
          return null;
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/login");
        return null;
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  useEffect(() => {
    if (user) {
      const fetchAddresses = async () => {
        try {
          let addresses = await fetchAddresses();
          addresses = addresses.results;
          setAddresses(addresses);
        } catch (error) {
          toast.error("Error fetching addresses:", error);
        }
      };

      fetchAddresses();
    }
  }, [user]);

  const handlePayNow = async () => {
    if (!selectedAddress || !paymentMethod) {
      toast.error("Please select a delivery address and payment method.");
      return;
    }

    let res;

    if (paymentMethod === "card") {
      const response = await submitOrder(selectedAddress.id, "card");

      if (response.status === 200) {
        res = await response.json();
        setClientSecret(res.client_secret);
      } else {
        res = await response.json();
        toast.error("Error placing order:", res.error);
        router.push("/");
        return null;
      }
    } else {
      const response = await submitOrder(selectedAddress.id, "cod");
      if (response.status === 201) {
        res = await response.json();
        toast.success("Order placed successfully!");
        router.push("/my-account/orders");
      } else {
        res = await response.json();
        toast.error(res.error);
        router.push("/");
      }
    }
  };

  const submitOrder = async (addressId, paymentMethod) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FOOD_API}/orders?payment=${paymentMethod}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: addressId,
          status: "pending",
        }),
        credentials: "include",
      }
    );

    return response;
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
  };

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state while fetching user data
  }

  return (
    <Container className="my-8 mx-auto px-4 sm:px-6 lg:px-8">
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <Grid container spacing={4}>
          {/* Address Selection */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              className="font-bold mb-4 pb-4"
              style={{ color: "darkslategray" }}
            >
              Select Address
            </Typography>
            <div className="space-y-4">
              {addresses?.map((address, index) => (
                <div
                  key={address.id}
                  className={`${
                    selectedAddress?.id === address.id
                      ? "ring-2 ring-green-500"
                      : "ring-0"
                  }`}
                >
                  <Card
                    key={address.id}
                    className={`shadow-md hover:shadow-lg transition-shadow duration-300 p-4`}
                    onClick={() => handleAddressSelect(address)}
                  >
                    <CardContent>
                      <Typography variant="h6" className="font-semibold mb-2">
                        {index + 1}. {address.country}
                      </Typography>
                      <Typography variant="body1" className="mb-2">
                        {address.address}
                      </Typography>
                      <Typography variant="body1" className="mb-2">
                        {address.postal_code}
                      </Typography>
                      <Typography variant="body1" className="mb-2">
                        {address.is_default}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </Grid>

          {/* Payment Method Selection and Pay Now Button */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              className="font-bold mb-4 pb-4"
              style={{ color: "darkslategray" }}
            >
              Payment Method
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mb-4"
            >
              <FormControlLabel
                value="card"
                control={
                  <Radio
                    icon={<CreditCardIcon />}
                    checkedIcon={<CreditCardIcon />}
                  />
                }
                label="Credit/Debit Card"
                className="mb-2"
              />
              <FormControlLabel
                value="cod"
                control={
                  <Radio
                    icon={<LocalShippingIcon />}
                    checkedIcon={<LocalShippingIcon />}
                  />
                }
                label="Cash on Delivery"
                className="mb-2"
              />
            </RadioGroup>
            <Button
              variant="contained"
              startIcon={<PaymentIcon />}
              onClick={handlePayNow}
              className="w-full px-6 py-3"
              color="error"
              sx={{ backgroundColor: "darkslategray" }}
            >
              Pay Now
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CheckoutPage;
