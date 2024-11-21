import React, { useState, useEffect } from "react";
import { printDoc } from "../../../js/staff/printDoc.js";
import Skeleton from "react-loading-skeleton";
import { Doughnut } from "react-chartjs-2";
import { pieData, pieOptions } from "./chartData.js";
import loadPieChart from "./chartData.js";
// ---------TEST SKELETON------------
import loadTabData from "./tabData.js";
// ----------------------------------

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [TableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState(pieData);
  const [TabData, setTabData] = useState([]);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const pieChartData = await loadPieChart();
      setTableData(
        pieChartData.labels.map((name, index) => ({
          menu_item_id: index + 1,
          name,
          count: pieChartData.datasets[0].data[index],
        }))
      );
      setChartData(pieChartData);
      // 
      const tabData = await loadTabData();
      setTabData(tabData)
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="py-3">
        <div className="flex justify-end">
          <button
            className="text-white focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-green-800 hover:bg-gunmetal focus:ring-green-800 transition-all"
            onClick={printDoc}
          >
            Print today's report
          </button>
        </div>
        {/* Wrapper */}
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex flex-wrap -mx-3">
            {TabData.map((item, index) => (
              <div
                key={index}
                className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4"
              >
                <div className="relative flex flex-col min-w-0 break-words bg-white rounded-2xl border-solid border-2 border-gray-500 bg-clip-border">
                  <div className="flex-auto p-4">
                    <div className="flex flex-row -mx-3">
                      <div className="px-3 text-right basis-1/3">
                        <div className="inline-block w-12 h-12 text-center rounded-circle">
                          <div
                            dangerouslySetInnerHTML={{ __html: item.IconSVG }}
                          />
                        </div>
                      </div>
                      <div className="flex-none w-2/3 max-w-full px-3">
                        <div>
                          <p className="mb-0 font-sans text-sm font-semibold leading-normal uppercase text-dark opacity-60">
                            {item.tabName}
                          </p>
                          {loading ? (
                            <section className="bg-slate-200 animate-pulse">
                              <Skeleton />
                            </section>
                          ) : (
                            <h2 className="text-xl font-semibold leading-normal text-dark">
                              {item.data}
                            </h2>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* End of statistics */}
          </div>
        </div>
        {/* Table & Pie chart */}
        <div className="w-full px-6 py-6 mx-auto">
          <div className="flex sm:flex-col justify-center lg:flex-row">
            <div className="w-full lg:basis-3/5 px-3">
              <table className="w-full text-sm text-left rtl:text-right ">
                <caption className="text-lg font-semibold text-dark mb-4">Today's Most Popular Dishes</caption>
                <thead className="uppercase bg-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Item ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Item name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Sold today
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-200">
                  {TableData.map((item, index) => (
                    <tr key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        {item.menu_item_id}
                      </th>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full lg:basis-2/5 px-3 mt-6 lg:mt-0 sm:px-6">
              <Doughnut data={chartData} options={pieOptions} />
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
}
