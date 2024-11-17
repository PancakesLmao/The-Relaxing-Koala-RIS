import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import ChartData from "../../../components/manager/chartData";
// ---------TEST SKELETON------------
import Data from "./testLoadData.js";
// ----------------------------------

export default function Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  // Simulate data fetching
  setTimeout(() => {
    setLoading(false);
  }, 2000);
  // ---------TEST SKELETON------------
  useEffect(() => {
    if (chartRef.current) {
      ChartData(chartRef.current);
    }
  }, []);

  return (
    <>
      <div className="py-3">
        <div className="flex justify-end">
          <button className="text-white focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 bg-green-800 hover:bg-gunmetal focus:ring-green-800 transition-all">
            Print today's report
          </button>
        </div>
        {/* Wrapper */}
        <div className="w-full px-6 py-6 mx-auto">
          <div class="flex flex-wrap -mx-3">
            {/*  */}
            {Data.map((item, index) => (
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
          </div>
        </div>
      </div>
    </>
  );
}
