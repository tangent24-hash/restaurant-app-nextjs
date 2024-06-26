import Image from "next/image";
import { FaStar } from "react-icons/fa";
import getFoodDetails from "@/app/lib/getFoodDetails";
import AddToCart from "@/app/components/food/AddToCart";
import ShareButtons from "@/app/components/food/ShareButtons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import { fetchFoodReviews } from "@/app/lib/foods/api";
import Reviews from "@/app/components/food/Reviews";
import { Suspense } from "react";

export default async function ProductPage({ params }) {
  const id = params?.id;

  let product = await getFoodDetails(id);
  const initialUrl = `${process.env.NEXT_PUBLIC_FOOD_API}/reviews?food=${id}`;
  const initialReviews = await fetchFoodReviews(initialUrl);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={400}
            style={{
              objectFit: "cover",
              layout: "responsive",
            }}
          />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center my-4">
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <span className="ml-2 text-lg">{product.rating}</span>
          </div>
          <p className="text-lg mb-4">{product.details}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          <ToastContainer />
          {product.in_stock >= 0 && (
            <div className="product-actions">
              <Suspense fallback={<div>Loading...</div>}>
                <AddToCart id={id} />
              </Suspense>
            </div>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <ShareButtons />
          </Suspense>
        </div>
      </div>
      <div className="mt-8">
        <Suspense fallback={<div>Loading...</div>}>
          <Reviews
            initialReviews={initialReviews}
            initialUrl={initialUrl}
            foodId={id}
          />
        </Suspense>
      </div>
    </div>
  );
}
