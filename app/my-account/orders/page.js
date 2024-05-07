"use client";
import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
} from "@mui/material";
import getOrders from "@/lib/getOrders";
import Link from "next/link";
import withAuth from "@/authentication/withAuth";

const statusStyles = {
  processing: "bg-yellow-400",
  delivered: "bg-green-500",
  pending: "bg-red-500",
  shipped: "bg-blue-500",
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [pagination, setPagination] = useState({ next: null, prev: null });
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("created_desc");

  useEffect(() => {
    const fetchInitialOrders = async () => {
      const initialOrders = await getOrders();
      setOrders(initialOrders.results);
      setFilteredOrders(initialOrders.results);
      setPagination({ next: initialOrders.next, prev: initialOrders.previous });
    };

    fetchInitialOrders();
  }, []);

  useEffect(() => {
    let sortedAndFiltered = [...orders];

    if (filter !== "all") {
      sortedAndFiltered = sortedAndFiltered.filter(
        (order) => order.status === filter
      );
    }

    sortedAndFiltered.sort((a, b) => {
      switch (sort) {
        case "created_desc":
          return new Date(b.created_date) - new Date(a.created_date);
        case "created_asc":
          return new Date(a.created_date) - new Date(b.created_date);
        case "amount_desc":
          return b.total_amount - a.total_amount;
        case "amount_asc":
          return a.total_amount - b.total_amount;
        default:
          return 0;
      }
    });

    setFilteredOrders(sortedAndFiltered);
  }, [filter, sort, orders]);

  const handlePagination = async (pageUrl) => {
    if (!pageUrl) return; // Add this check to prevent errors when pageUrl is null

    // Extract the page number from the URL
    const match = pageUrl.match(/page=(\d+)/);
    if (match && match[1]) {
      const pageNumber = match[1];
      let paginatedOrders = await getOrders(pageNumber);
      setOrders(paginatedOrders.results);
      if (pageNumber == 2) {
        paginatedOrders.previous += "&page=1";
      }
      setPagination({
        next: paginatedOrders.next,
        prev: paginatedOrders.previous,
      });
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-200">
      <Typography variant="h4" className="mb-4" sx={{ color: "darkslategray" }}>
        My Orders
      </Typography>
      <div className="flex flex-col lg:flex-row-reverse justify-between">
        <div className="w-full lg:w-1/4 p-4">
          <FormControl variant="filled" className="w-full mb-4">
            <InputLabel htmlFor="filter-select">Filter by Status</InputLabel>
            <Select
              value={filter}
              onChange={handleFilterChange}
              className="bg-white text-gray-700"
              inputProps={{
                name: "status",
                id: "filter-select",
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" className="w-full">
            <InputLabel htmlFor="sort-select">Sort by</InputLabel>
            <Select
              value={sort}
              onChange={handleSortChange}
              className="bg-white text-gray-700"
              inputProps={{
                name: "sort",
                id: "sort-select",
              }}
            >
              <MenuItem value="created_desc">Created Date (Newest)</MenuItem>
              <MenuItem value="created_asc">Created Date (Oldest)</MenuItem>
              <MenuItem value="amount_desc">Amount (High to Low)</MenuItem>
              <MenuItem value="amount_asc">Amount (Low to High)</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="w-full lg:w-3/4">
          {filteredOrders.map((order) => (
            <Link href={`/my-account/orders/${order.id}`} key={order.id}>
              <Card className="mb-4 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="relative">
                  <Typography variant="subtitle2" className="text-sm">
                    Order ID: {order.id}
                  </Typography>
                  <Typography variant="body2">
                    Total Amount: ${order.total_amount.toFixed(2)}
                  </Typography>
                  <Typography variant="body2">
                    Created Date:{" "}
                    {new Date(order.created_date).toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    className={`absolute top-0 right-0 rounded-bl-lg px-2 py-1 ${
                      statusStyles[order.status]
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          disabled={!pagination.prev}
          onClick={() => handlePagination(pagination.prev)}
          className="shadow-md hover:shadow-lg"
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={!pagination.next}
          onClick={() => handlePagination(pagination.next)}
          className="shadow-md hover:shadow-lg"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default withAuth(OrdersPage);
