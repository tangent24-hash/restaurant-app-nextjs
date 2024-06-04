import getFoodItems from "@/app/lib/getFoodItems";
import AddToCart from "../food/AddToCart";
import Link from "next/link";
import LoadMore from "./loadMore";
import { Suspense } from "react";
import Loading from "@/app/loading";

export const FoodItem = ({ food }) => (
  <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col h-full">
    <Link href={`/food/${food.id}`}>
      <img
        className="w-full h-48 object-cover rounded-t-lg"
        src={food.image}
        alt="Food Image"
      />
    </Link>
    <div className="p-4 flex flex-col justify-between flex-grow">
      <div>
        <h2 className="text-lg font-semibold mb-2">{food.name}</h2>
        <p className="text-gray-600 mb-2">Price: ${food.price}</p>

        <div className="flex items-center mb-2">
          <span className="text-yellow-500">⭐</span>
          <span className="ml-1 text-gray-600">{food.rating}</span>
        </div>
      </div>
      <AddToCart id={food.id} />
    </div>
  </div>
);

const FoodItems = async ({ category }) => {
  let data = await getFoodItems(1, category);
  let foods = data.results;

  return (
    <div className="mx-auto flex flex-col items-center px-4 py-10 md:container">
      <div className="grid w-full max-w-[1150px] gap-6 md:grid-cols-4">
        {foods.map((food) => (
          <FoodItem key={food.id} food={food} />
        ))}
      </div>
      {data.next && (
        <Suspense fallback={<Loading />}>
          <LoadMore />
        </Suspense>
      )}
    </div>
  );
};

export default FoodItems;
// Path: components/home/foods.js
