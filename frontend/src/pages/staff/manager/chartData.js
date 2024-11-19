import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
//
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default async function loadPieChart() {
  const currentDate = getCurrentDate();
  const API_URL = `http://127.0.0.1:8000/orders/get-menu-item-count-from-date/${currentDate}`;
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    // Sort data from highest to lowest count
    const sortedData = data.sort((a, b) => b.count - a.count);
    // Pick top 5 dishes
    const top5PieData = sortedData.slice(0, 5);
    // Extract data
    const labels = top5PieData.map((item) => item.name);
    const counts = top5PieData.map((item) => item.count);
    const backgroundColors = [
      "rgb(255, 99, 132)",
      "rgb(54, 162, 235)",
      "rgb(255, 205, 86)",
      "rgb(75, 192, 192)",
      "rgb(153, 102, 255)",
    ];

    return {
      labels,
      datasets: [
        {
          label: "Today's Popular Dishes",
          data: counts,
          backgroundColor: backgroundColors,
          hoverOffset: 4,
        },
      ],
    };
  } catch (error) {
    console.error("Error: ", error);
  }
}

export const pieData = {
  labels: [],
  datasets: [
    {
      label: "Doughnut Dataset",
      data: [],
      backgroundColor: [],
      hoverOffset: 4,
    },
  ],
};
export const pieOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Doughnut of Popular Dishes by Date",
    },
  },
};
//
