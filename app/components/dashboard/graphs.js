"use client";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";

const Graphs = ({
  ordersChartData,
  ordersCountData,
  stockData,
  revenueData,
  orderStatusData,
}) => {
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

export default Graphs;
