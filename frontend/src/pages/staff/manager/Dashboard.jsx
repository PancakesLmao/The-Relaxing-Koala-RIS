import React, { useEffect, useRef } from "react";
import ChartData from "../../../components/manager/chartData";

export default function Dashboard() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      ChartData(chartRef.current);
    }
  }, []);

  return (
    <>
      <div className="py-3">
        <div className="flex justify-end">
          <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Download PDF with Chart
          </button>
        </div>
        <div>
          <canvas ref={chartRef} id="myChart" width={300} height={150}></canvas>
        </div>
      </div>
    </>
  );
}
