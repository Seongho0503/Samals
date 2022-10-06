import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
function TradeChart({ lables, data }) {
  const options = {};
  const chartData = {
    labels: ["거래내역", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        type: "line",
        borderWidth: 1,
        borderColor: "red",
        pointBorderWidth: 0,
        backgroundColor: "black",
        pointBackgroundColor: "transparent",
        data: [1, 2, 3, 4, 5],
      },
    ],
  };
  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default TradeChart;
