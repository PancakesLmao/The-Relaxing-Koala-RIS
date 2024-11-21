import React from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const printDoc = async (username, tableData, tabData, lineChartRef) => {
  const doc = new jsPDF();
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const currentDate = `${year}-${month}-${day}`;
  // Center the title and make it bold
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  const title = "The Relaxing Koala daily sales report";
  const titleWidth = doc.getTextWidth(title);
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(title, titleX, 10);
  // Content
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const rightTextX = pageWidth - 10;
  doc.text(`Created and printed on: ${currentDate}`, rightTextX, 20, {
    align: "right",
  });
  doc.text(`Printed by: ${username}`, rightTextX, 30, { align: "right" });
  // Add tab data
  doc.text("Today's summary:", 10, 50 + tableData.length * 10);
  tabData.forEach((item, index) => {
    doc.text(
      `${item.tabName}: ${item.data}`,
      10,
      60 + tableData.length * 10 + index * 10
    );
  });
  // Add table data
  doc.text("Most popular dishes of the day:", 10, 40);
  tableData.forEach((item, index) => {
    doc.text(
      `${item.menu_item_id}. ${item.name}: ${item.count}`,
      10,
      50 + index * 10
    );
  });

  // Add line chart data
  doc.text("Most popular dishes of the day:", 10, 160);
  if (lineChartRef.current) {
    const canvas = await html2canvas(lineChartRef.current);
    const imgData = canvas.toDataURL("image/png");
    doc.addImage(
      imgData,
      "PNG",
      10,
      80 + tableData.length * 10 + tabData.length * 10,
      180,
      80
    );
  }if (lineChartRef.current) {
    const canvas = await html2canvas(lineChartRef.current);
    const imgData = canvas.toDataURL("image/png");
    doc.addImage(
      imgData,
      "PNG",
      10,
      80 + tableData.length * 10 + tabData.length * 10,
      180,
      80
    );
  }
  //
  doc.save("daily_sales_report.pdf");
};
