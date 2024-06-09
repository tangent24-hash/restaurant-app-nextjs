import React from "react";
import HeroAndOfferSection from "./components/home/heroSection";
import FoodItems from "./components/home/foods";
import { getUser } from "./api/auth";

export default async function Page() {
  const user = await getUser();

  return (
    <React.Fragment>
      <HeroAndOfferSection />
      <FoodItems user={user} />
    </React.Fragment>
  );
}
