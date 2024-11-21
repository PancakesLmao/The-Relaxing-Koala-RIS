function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function getTabData() {
  const currentDate = getCurrentDate();
  const API_URL1 = `http://127.0.0.1:8000/orders/get-orders-from-date/${currentDate}`;
  const API_URL2 = `http://127.0.0.1:8000/receipts/get-receipts-from-date/${currentDate}`;
  try {
    const response1 = await fetch(API_URL1);
    const response2 = await fetch(API_URL2);
    const data1 = await response1.json();
    const data2 = await response2.json();

    // Calculate total earning
    const totalEarning = data2
      .reduce((sum, item) => sum + item.total_after_tax, 0)
      .toFixed(2);
    // console.log(totalEarning);

    // Count total orders
    const countTotal = data1.length;
    // console.log(countTotal);

    // Count dine-in orders
    const countDineIn = data1.filter(
      (dineInOrder) => dineInOrder.order_type === "DINE_IN"
    ).length;
    // console.log(countDineIn);

    // Count online orders
    const countOnline = data1.filter(
      (onlineOrder) => onlineOrder.order_type === "ONLINE"
    ).length;
    // console.log(countTakeaway);

    return {totalEarning, countTotal, countDineIn, countOnline };
  } catch (error) {
    console.error("Error: ", error);
  }
}

export default async function loadTabData() { 
  const tabData = await getTabData();
  const data = [
    {
      IconSVG:
        '<svg class="w-[48px] h-[48px] text-gray-800 text-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M5 18h14M5 18v3h14v-3M5 18l1-9h12l1 9M16 6v3m-4-3v3m-2-6h8v3h-8V3Zm-1 9h.01v.01H9V12Zm3 0h.01v.01H12V12Zm3 0h.01v.01H15V12Zm-6 3h.01v.01H9V15Zm3 0h.01v.01H12V15Zm3 0h.01v.01H15V15Z"/></svg>',
      tabName: "Today earning",
      data: `$${tabData.totalEarning}`,
    },
    {
      IconSVG:
        '<svg class="w-[48px] h-[48px] text-gray-800 text-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"/></svg>',
      tabName: "Total order",
      data: tabData.countTotal,
    },
    {
      IconSVG:
        '<svg class="w-[48px] h-[48px] text-gray-800 text-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"/></svg>',
      tabName: "Dine-in order",
      data: tabData.countDineIn,
    },
    {
      IconSVG:
        '<svg class="w-[48px] h-[48px] text-gray-800 text-dark" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="M14.079 6.839a3 3 0 0 0-4.255.1M13 20h1.083A3.916 3.916 0 0 0 18 16.083V9A6 6 0 1 0 6 9v7m7 4v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1Zm-7-4v-6H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1Zm12-6h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v-6Z"/></svg>',
      tabName: "Online order",
      data: tabData.countOnline,
    },
  ];
  return data;
}

