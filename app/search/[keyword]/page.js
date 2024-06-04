"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { fetchSearchResults } from "@/app/lib/api";
import Loading from "@/app/loading";
import Link from "next/link";
import AddToCart from "@/app/components/food/AddToCart";

const SearchPage = ({ params }) => {
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null);

  const keyword = params.keyword;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetchSearchResults(keyword);
        setResults(response.results);
        setNextPage(response.next);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      const response = await fetch(nextPage);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults([...results, ...data.results]);
      setNextPage(data.next);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching more search results:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto flex flex-col items-center px-4 py-10 md:container">
      <h1 className="text-3xl font-semibold mb-6">Search Results</h1>
      <div className="grid w-full max-w-[1150px] gap-6 md:grid-cols-4">
        {results.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105 flex flex-col h-full"
          >
            <Link href={`/food/${item.id}`}>
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={item.image}
                alt="Food Image"
              />
            </Link>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600 mb-2">Price: ${item.price}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 text-gray-600">{item.rating}</span>
                </div>
              </div>
              <AddToCart id={item.id} />
            </div>
          </div>
        ))}
      </div>
      {nextPage && (
        <Button
          onClick={handleLoadMore}
          variant="contained"
          color="primary"
          disabled={loading}
          className="mt-6"
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default SearchPage;
