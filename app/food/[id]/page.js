import Image from "next/image";
import { FaStar } from "react-icons/fa";
import getFoodDetails from "@/lib/getFoodDetails";
import AddToCart from "@/components/food/AddToCart";
import ShareButtons from "@/components/food/ShareButtons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import getFoodReviews from "@/lib/getReviews";

export default async function ProductPage({ params }) {
  const id = params.id;

  let product = await getFoodDetails(id);
  let reviews = await getFoodReviews(id);
  reviews = reviews.results;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-4">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            layout="responsive"
            objectFit="fill"
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
              <AddToCart id={id} />
            </div>
          )}
          <ShareButtons />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center"
          >
            <div className="flex-1">
              <p className="font-bold">{review.reviewer_name}</p>
              <div className="flex items-center">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                <span className="ml-1">{review.rating}</span>
              </div>
              <p className="italic">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
