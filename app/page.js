import React from "react";
import HeroAndOfferSection from "./components/home/heroSection";
import FoodItems from "./components/home/foods";

export default function Page() {
  return (
    <React.Fragment>
      <HeroAndOfferSection />
      <FoodItems />
    </React.Fragment>
  );
}

