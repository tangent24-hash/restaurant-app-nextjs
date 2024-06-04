"use client";
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { fetchFoods, fetchOrders } from "@/app/lib/api";
import WithStaff from "@/app/authentication/WithStaff";

const Dashboard = async () => {
  const foodsData = await fetchFoods();
  const ordersData = await fetchOrders();

  const foods = foodsData.results;
  const orders = ordersData.results;

  const orderDates = orders.map((order) =>
    new Date(order.created_date).toLocaleDateString()
  );
  const totalAmounts = orders.map((order) => order.total_amount);

  const calculateOrderStatusCounts = (orders) => {
    return orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
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
        data: orderDates.reduce((acc, date) => {
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
    labels: [...new Set(foods.map((food) => food.category))],
    datasets: [
      {
        label: "Items in Stock",
        data: foods.reduce((acc, food) => {
          acc[food.category] = (acc[food.category] || 0) + food.in_stock;
          return acc;
        }, {}),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const revenueData = {
    labels: foods.map((food) => food.name),
    datasets: [
      {
        label: "Total Revenue",
        data: foods.map((food) => food.price * food.sale_count),
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
    <div className="grid grid-cols-1 md:grid-cols-4 pt-0">
      <main className="md:col-span-3 p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              Total Sales Over Time
            </h2>
            <Line data={ordersChartData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              Number of Orders Over Time
            </h2>
            <Bar data={ordersCountData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              Items in Stock by Category
            </h2>
            <Bar data={stockData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              Total Revenue by Food Item
            </h2>
            <Bar data={revenueData} />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Order Status Count</h2>
            <Bar data={orderStatusData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WithStaff(Dashboard);
