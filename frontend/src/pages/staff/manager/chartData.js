import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
const API_URL =
  "http://127.0.0.1:8000/orders/get-menu-item-count-from-date/2024-11-19";
//
ChartJS.register(ArcElement, Tooltip, Legend);

export default async function loadPieChart() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export const pieData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205,86)",
      ],
      hoverOffset: 4,
    },
  ],
};
//
const lineData = {};
