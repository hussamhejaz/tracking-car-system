import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FaBell, FaUserCircle, FaTruck, FaCogs, FaAngleDown, FaAngleUp, FaMapMarkerAlt, FaChartLine } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimeDisplay from './TimeDisplay'; // Import the TimeDisplay component

// Mock data for the charts
const chartData = [
  { name: "سائقين", value: 10 },
  { name: "حاويات", value: 20 },
  { name: "معاملات", value: 5 },
];

// Pie chart data
const pieData = [
  { name: "In Transit", value: 15 },
  { name: "Delivered", value: 10 },
  { name: "Delayed", value: 3 },
];

// Pie chart colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const notify = (message) => toast(message);

  useEffect(() => {
    // Simulate fetching live data (e.g., driver locations, container statuses)
    // Example: notify('Driver 1 is behind schedule!');
  }, []);

  return (
    <div className="dashboard bg-white text-gray-900 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">لوحة القيادة للمصانع</h1>
      </div>

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

      {/* Send Notification Button */}
      <button
        className="p-2 bg-green-500 text-white rounded mb-6"
        onClick={() => notify("تنبيه: هناك تأخير في تسليم الحاويات!")}
      >
        <FaBell className="inline-block mr-2" /> إرسال تنبيه
      </button>

      <ToastContainer />

      {/* Key KPIs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-100 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold text-right">إجمالي الحاويات المسلّمة اليوم</h3>
          <p className="text-4xl font-bold text-right mt-4">45</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold text-right">متوسط وقت التسليم</h3>
          <p className="text-4xl font-bold text-right mt-4">3 أيام</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow">
          <h3 className="text-2xl font-semibold text-right">الحاويات في النقل</h3>
          <p className="text-4xl font-bold text-right mt-4">15</p>
        </div>
      </div>

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

        {/* Pie Chart for Container Status */}
        <div className="bg-gray-200 p-6 rounded-lg shadow card">
          <h2 className="text-2xl font-bold mb-4 text-right">حالة الحاويات</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
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
