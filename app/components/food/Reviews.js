"use client";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { fetchFoodReviews, postReview } from "@/app/lib/foods/api";
import { toast } from "react-toastify";
import { getUser } from "@/app/api/auth";

const Reviews = ({ initialReviews, initialUrl, foodId }) => {
  const [reviewsData, setReviewsData] = useState(initialReviews);
  const [nextPage, setNextPage] = useState(initialReviews.next);
  const [prevPage, setPrevPage] = useState(initialReviews.previous);
  const [reviewData, setReviewData] = useState({
    image: null,
    rating: null,
    review: "",
    foodname: null,
    reviewer: null,
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    setReviewsData(initialReviews);
    setNextPage(initialReviews.next);
    setPrevPage(initialReviews.previous);
  }, [initialReviews]);

  const fetchReviews = async (url) => {
    const newReviews = await fetchFoodReviews(url);

    setReviewsData(newReviews);
    setNextPage(newReviews.next);
    setPrevPage(newReviews.previous);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setReviewData({ ...reviewData, image: files[0] });
    } else {
      setReviewData({ ...reviewData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to post a review");
      return;
    }

    const formData = new FormData();
    formData.append("image", reviewData.image);
    formData.append("rating", reviewData.rating);
    formData.append("review", reviewData.review);
    formData.append("foodname", foodId);
    formData.append("reviewer", user.id);

    try {
      await postReview(formData);
      toast.success("Review submitted successfully");

      setReviewData({
        image: null,
        rating: null,
        review: "",
        foodname: null,
        reviewer: null,
      });

      fetchReviews(initialUrl); // Reload reviews after posting a new one
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-4">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>
        {reviewsData?.results.map((review) => (
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
            {review.image && (
              <img
                src={review.image}
                alt="Review"
                className="w-16 h-16 full mr-4"
              />
            )}
          </div>
        ))}
        <div className="flex justify-between mt-4">
          {prevPage && (
            <button
              onClick={() => fetchReviews(prevPage)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Previous
            </button>
          )}
          {nextPage && (
            <button
              onClick={() => fetchReviews(nextPage)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Next
            </button>
          )}
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h3 className="text-2xl font-bold mb-4">Submit Your Review</h3>
        {!user ? (
          <p className="text-red-500">You must be logged in to post a review</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="rating"
              >
                Rating
              </label>
              <select
                name="rating"
                id="rating"
                value={reviewData.rating || ""}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="review"
              >
                Review
              </label>
              <textarea
                name="review"
                id="review"
                value={reviewData.review}
                onChange={handleChange}
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {reviewData.image && (
                <img
                  src={URL.createObjectURL(reviewData.image)}
                  alt="Preview"
                  className="h-48 mt-4"
                />
              )}
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reviews;
