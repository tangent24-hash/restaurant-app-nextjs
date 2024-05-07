// FoodItemForm.js
import { useState } from "react";

const FoodItemForm = ({ food, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: food?.name || "",
    details: food?. details || "",
    price: food?.price || "",
    image: food?.image || "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <textarea
        name="details"
        value={formData.details}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="text"
        name="image"
        value={formData.image}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FoodItemForm;
