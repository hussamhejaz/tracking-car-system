import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import TimeDisplay from './TimeDisplay'; // Import the TimeDisplay component

// Mock data for the charts
const chartData = [
  { name: "سائقين", value: 10 },
  { name: "حاويات", value: 20 },
  { name: "معاملات", value: 5 },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const notify = () => toast("تم إرسال تنبيه!");

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-right">لوحة القيادة</h1>

      {/* Time Display */}
      <TimeDisplay />

      {/* Search Bar */}
      <div className="mb-4 mt-6">
        <input
          type="text"
          placeholder="ابحث عن السائقين أو الحاويات..."
          className="p-2 border rounded-lg w-full text-right"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <button className="p-2 bg-green-500 text-white rounded mb-6" onClick={notify}>
        إرسال تنبيه
      </button>

      <ToastContainer />

      {/* Responsive Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Collapsible Card */}
        <div className="bg-gray-200 p-6 rounded-lg shadow card">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">إحصائيات السائقين</h2>
            <button onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <FaAngleDown /> : <FaAngleUp />}
            </button>
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-lg text-right">عدد السائقين المسجلين: 10</p>
              {/* Progress bar for drivers */}
              <div className="mt-2">
                <div className="w-full bg-gray-300 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "50%" }}></div>
                </div>
                <p className="text-sm text-right mt-2">50% من الهدف</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow card">
          <h2 className="text-2xl font-bold mb-4 text-right">إحصائيات الحاويات</h2>
          <p className="text-lg text-right">عدد الحاويات الحالية: 20</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow card">
          <h2 className="text-2xl font-bold mb-4 text-right">المعاملات الجارية</h2>
          <p className="text-lg text-right">عدد المعاملات الحالية: 5</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow card">
          <h2 className="text-2xl font-bold mb-4 text-right">إحصائيات بيانية</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" reversed />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow card">
          <h2 className="text-2xl font-bold mb-4 text-right">تقارير الحالة</h2>
          <p className="text-lg text-right">عرض التقارير التفصيلية</p>
        </div>

        <div className="bg-gray-200 p-6 rounded-lg shadow card">
          <h2 className="text-2xl font-bold mb-4 text-right">الإعدادات العامة</h2>
          <p className="text-lg text-right">ضبط الإعدادات</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
