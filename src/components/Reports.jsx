import React, { useState } from "react";
import { FaFilePdf, FaFileExcel, FaChartPie, FaCalendarAlt, FaUser, FaBox } from "react-icons/fa";

const Reports = () => {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedDriver, setSelectedDriver] = useState("All");
  const [selectedContainerStatus, setSelectedContainerStatus] = useState("All");

  const generateReport = (format) => {
    // Logic to generate a report based on selected filters and export format (PDF or Excel)
    console.log(`Generating ${format} report for driver: ${selectedDriver}, container status: ${selectedContainerStatus}, date range: ${dateRange.start} - ${dateRange.end}`);
    // Here you can add logic for generating a PDF or Excel report
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-right">التقارير الذكية</h1>

      {/* Report Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Date Range Filter */}
        <div className="text-right">
          <label className="block mb-2 font-semibold text-gray-700">نطاق التاريخ</label>
          <div className="flex items-center space-x-2 flex-row-reverse">
            <FaCalendarAlt className="text-gray-500" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="من"
            />
            <span className="mx-2">إلى</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="border border-gray-300 p-2 rounded-lg"
              placeholder="إلى"
            />
          </div>
        </div>

        {/* Driver Filter */}
        <div className="text-right">
          <label className="block mb-2 font-semibold text-gray-700">السائق</label>
          <div className="flex items-center space-x-2 flex-row-reverse">
            <FaUser className="text-gray-500" />
            <select
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg"
            >
              <option value="All">الكل</option>
              <option value="Driver1">سائق 1</option>
              <option value="Driver2">سائق 2</option>
              <option value="Driver3">سائق 3</option>
            </select>
          </div>
        </div>

        {/* Container Status Filter */}
        <div className="text-right">
          <label className="block mb-2 font-semibold text-gray-700">حالة الحاوية</label>
          <div className="flex items-center space-x-2 flex-row-reverse">
            <FaBox className="text-gray-500" />
            <select
              value={selectedContainerStatus}
              onChange={(e) => setSelectedContainerStatus(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg"
            >
              <option value="All">الكل</option>
              <option value="In Transit">في النقل</option>
              <option value="Delivered">تم التسليم</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generate Report Buttons */}
      <div className="flex space-x-4 flex-row-reverse">
        <button
          onClick={() => generateReport("PDF")}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
        >
          <FaFilePdf className="inline-block mr-2" /> إنشاء تقرير PDF
        </button>
        <button
          onClick={() => generateReport("Excel")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          <FaFileExcel className="inline-block mr-2" /> إنشاء تقرير Excel
        </button>
      </div>

      {/* Report Summary Section */}
      <div className="mt-8 text-right bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">ملخص التقارير</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <FaChartPie className="text-3xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold">نسبة الحاويات المسلّمة</h3>
            <p className="mt-2 text-gray-600">85% من الحاويات تم تسليمها بنجاح هذا الشهر.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <FaChartPie className="text-3xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold">أداء السائقين</h3>
            <p className="mt-2 text-gray-600">أداء السائق 1: 92% من التسليمات في الوقت المحدد.</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <FaChartPie className="text-3xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold">متوسط وقت التسليم</h3>
            <p className="mt-2 text-gray-600">المتوسط: 4 أيام لكل عملية نقل.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
