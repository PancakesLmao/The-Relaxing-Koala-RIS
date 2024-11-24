function getCurrentMonth() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export default async function loadFeatured() {
  const currentMonth = getCurrentMonth();
  const API_URL = `http://127.0.0.1:8000/orders/get-menu-item-count-from-date/${currentMonth}`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // Sort data from highest to lowest count
    const sortedData = data.sort((a, b) => b.count - a.count);
    // Pick top 3 dishes of the month
    const top3FeaturedData = sortedData.slice(0, 3);
    // Add image_name
    const top3withImage = top3FeaturedData.map((item) => ({
      ...item,
      image_name: item.name.toLowerCase().replace(/ /g, "_"),
    }));
    return top3withImage;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
}
