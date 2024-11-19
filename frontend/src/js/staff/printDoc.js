import React from 'react';
import { jsPDF } from 'jspdf';
export const printDoc = () => {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("annual_report.pdf");
}