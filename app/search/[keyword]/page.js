"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { searchFoodItems } from "@/lib/api";
import Loading from "@/app/loading";

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
        const response = await searchFoodItems(keyword);
        setResults(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
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
    <div>
      <h1>Search Results</h1>
      <List>
        {results.map((item) => (
          <ListItem
            key={item.id}
            button
            onClick={() => router.push(`/food/${item.id}`)}
          >
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
      {nextPage && (
        <Button onClick={handleLoadMore} disabled={loading}>
          Load More
        </Button>
      )}
    </div>
  );
};

export default SearchPage;
