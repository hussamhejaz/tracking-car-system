// src/components/Reports.jsx
import React from "react";

const Reports = () => {
  const generateReport = () => {
    // Add logic to generate a report (e.g., export to PDF or Excel)
    console.log("Generating report...");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">التقارير</h1>
      <p className="mt-4">إنشاء تقارير بناءً على السائقين أو الحاويات.</p>
      <button
        onClick={generateReport}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        إنشاء تقرير
      </button>
    </div>
  );
};

export default Reports;
