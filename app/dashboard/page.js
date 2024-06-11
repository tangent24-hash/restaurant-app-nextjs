"use client";
import React, { useEffect, useState } from "react";
import Graphs from "../components/dashboard/graphs";
import withStaff from "../authentication/withStaff";
import { fetchFoods, fetchOrders } from "@/app/lib/api";
import Loading from "../loading";

const Dashboard = () => {
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodsData = await fetchFoods();
        const ordersData = await fetchOrders();

        setFoods(foodsData?.results || []);
        setOrders(ordersData?.results || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  const orderDates = orders?.map((order) =>
    new Date(order?.created_date).toLocaleDateString()
  );
  const totalAmounts = orders?.map((order) => order?.total_amount);

  const calculateOrderStatusCounts = (orders) => {
    return orders?.reduce((acc, order) => {
      acc[order?.status] = (acc[order?.status] || 0) + 1;
      return acc;
    }, {});
  };

  const ordersChartData = {
    labels: orderDates,
    datasets: [
      {
        label: "Total Amount",
        data: totalAmounts,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const ordersCountData = {
    labels: orderDates,
    datasets: [
      {
        label: "Number of Orders",
        data: orderDates?.reduce((acc, date) => {
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {}),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const stockData = {
    labels: [...new Set(foods?.map((food) => food.category))],
    datasets: [
      {
        label: "Items in Stock",
        data: foods?.reduce((acc, food) => {
          acc[food?.category] = (acc[food?.category] || 0) + food.in_stock;
          return acc;
        }, {}),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: foods?.map((food) => food.name),
    datasets: [
      {
        label: "Total Revenue",
        data: foods?.map((food) => food?.price * food?.sale_count),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const orderStatusCounts = calculateOrderStatusCounts(orders);

  const orderStatusData = {
    labels: Object.keys(orderStatusCounts),
    datasets: [
      {
        label: "Order Status Count",
        data: Object.values(orderStatusCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Graphs
        ordersChartData={ordersChartData}
        ordersCountData={ordersCountData}
        stockData={stockData}
        revenueData={revenueData}
        orderStatusData={orderStatusData}
      />
    </>
  );
};

export default withStaff(Dashboard);
