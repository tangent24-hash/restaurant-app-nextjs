"use client";
import { useState } from "react";
import { FoodItem } from "./foods";
import getFoodItems from "@/app/lib/getFoodItems";
import { Button } from "@mui/material";

const LoadMore = () => {
  const [page, setPage] = useState(1);
  const [foodItems, setFoodItems] = useState([]);
  const [showButton, setShowButton] = useState(true);

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const response = await getFoodItems(nextPage);
    const newFoodItems = response.results;

    if (response.next === null) {
      setShowButton(false);
    }

    setPage(nextPage);
    setFoodItems([...foodItems, ...newFoodItems]);
  };

  return (
    <>
      <div className="grid w-full max-w-[1150px] gap-6 md:grid-cols-4 py-6">
        {foodItems.map((food) => (
          <FoodItem key={food.id} food={food} />
        ))}
      </div>

      {showButton && (
        <Button
          variant="contained"
          color="error"
          sx={{ backgroundColor: "darkslategray" }}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </>
  );
};

export default LoadMore;
// // Path: components/home/loadMore.js
