import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getYesterdaysDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function getPreviousDate() {
  const date = new Date();
  date.setDate(date.getDate() - 2);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default async function loadLineChart() {
  const currentDate = getCurrentDate();
  const yesterdaysDate = getYesterdaysDate();
  const previousDate = getPreviousDate();
  const API_URL1 = `http://127.0.0.1:8000/receipts/get-receipts-from-date/${currentDate}`;
  const API_URL2 = `http://127.0.0.1:8000/receipts/get-receipts-from-date/${yesterdaysDate}`;
  const API_URL3 = `http://127.0.0.1:8000/receipts/get-receipts-from-date/${previousDate}`;

  try {
    const response1 = await fetch(API_URL1);
    const data1 = await response1.json();
    const reposnse2 = await fetch(API_URL2);
    const data2 = await reposnse2.json();
    const reposnse3 = await fetch(API_URL3);
    const data3 = await reposnse3.json();

    // Calculate total earning
    const totalCurrentEarning = data1
      .reduce((sum, item) => sum + item.total_after_tax, 0)
      .toFixed(2);
    const totalYesterdaysEarning = data2
      .reduce((sum, item) => sum + item.total_after_tax, 0)
      .toFixed(2);
    const totalPreviousEarning = data3
      .reduce((sum, item) => sum + item.total_after_tax, 0)
      .toFixed(2);

    const labels = [previousDate, yesterdaysDate, currentDate];

    const datasets = [
      {
        label: "Total Earning over days (dollars)",
        data: [totalPreviousEarning, totalYesterdaysEarning, totalCurrentEarning],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ];

    return {
      labels,
      datasets,
    };
  } catch (error) {
    console.error("Error: ", error);
  }
}

export const lineData = {
  labels: [],
  datasets: [],
};

export const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Line Chart of total earning from the last 3 days",
    },
  },
};
