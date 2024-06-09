"use client";
import { useState, useEffect } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { updateFoodItem } from "@/app/lib/foods/api";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import getFoodDetails from "@/app/lib/getFoodDetails";
import withStaff from "@/app/authentication/withStaff";

const UpdateFoodItemPage = ({ params }) => {
  const router = useRouter();
  const id = params.id;
  const [foodItem, setFoodItem] = useState({
    name: "",
    details: "",
    price: "",
    in_stock: 0,
    image: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the current food item details to populate the form
    // You need to implement getFoodDetails API call
    const fetchFoodDetails = async () => {
      setLoading(true);
      const data = await getFoodDetails(id);
      setFoodItem(data);
      setLoading(false);
    };

    if (id) {
      fetchFoodDetails();
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image" && files.length > 0) {
      // Directly set the File object to the state
      setFoodItem({ ...foodItem, image: files[0] });
    } else {
      setFoodItem({ ...foodItem, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Create a new FormData object for the API call
      const formData = new FormData();
      formData.append("name", foodItem.name);
      formData.append("details", foodItem.details);
      formData.append("price", foodItem.price);
      formData.append("in_stock", foodItem.in_stock);

      // Append the image file to formData if it exists
      if (foodItem.image instanceof File) {
        console.log("yes image");
        formData.append("image", foodItem.image);
      }

      let res = await updateFoodItem(id, formData);
      if (res.id) {
        toast.success("Food item updated successfully!");
        router.push("/dashboard/foods");
      } else {
        toast.error("Failed to update food item.");
      }
    } catch (error) {
      toast.error("Failed to update food item.");
    }
    setLoading(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="container mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Name"
          name="name"
          value={foodItem.name}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          className="bg-white"
        />
        <TextField
          label="Details"
          name="details"
          value={foodItem.details}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          className="bg-white"
        />
        <TextField
          label="Price"
          name="price"
          value={foodItem.price}
          onChange={handleChange}
          type="number"
          fullWidth
          variant="outlined"
          className="bg-white"
        />
        <TextField
          label="In Stock"
          name="in_stock"
          value={foodItem.in_stock}
          onChange={handleChange}
          type="number"
          fullWidth
          variant="outlined"
          className="bg-white"
        />
        <input type="file" name="image" onChange={handleChange} />
        <img src={foodItem.image} alt={foodItem.name} className="h-48" />
        <Button
          type="submit"
          variant="contained"
          color="warning"
          sx={{ backgroundColor: "darkslategray" }}
          disabled={loading}
        >
          Update Food Item
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default withStaff(UpdateFoodItemPage);
