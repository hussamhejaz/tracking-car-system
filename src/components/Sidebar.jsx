import React from "react";
import { FaCar, FaBell, FaCog, FaTachometerAlt, FaChartLine, FaBox, FaSignOutAlt, FaUserPlus } from "react-icons/fa"; // Import FaUserPlus for Register
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`fixed top-0 ${isOpen ? "w-64" : "w-16"} h-full bg-gray-900 text-white shadow-lg transition-all duration-300 z-50`}>
      {/* Toggle Button */}
      <div className="h-16 flex items-center justify-center bg-gray-900">
        <button className="focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <div className="space-y-1">
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold">نظام تتبع السيارات</h2>
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-8">
        <ul className="flex flex-col pl-4 space-y-6">
          <li className="flex items-center">
            <Link to="/dashboard" className="flex items-center text-lg hover:text-gray-400 transition duration-300">
              <FaTachometerAlt className="text-lg" />
              {isOpen && <span className="ml-4">لوحة القيادة</span>}
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/drivers" className="flex items-center text-lg hover:text-gray-400 transition duration-300">
              <FaCar className="text-lg" />
              {isOpen && <span className="ml-4">السائقين</span>}
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/containers" className="flex items-center text-lg hover:text-gray-400 transition duration-300">
              <FaBox className="text-lg" />
              {isOpen && <span className="ml-4">الحاويات</span>}
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/transactions" className="flex items-center text-lg hover:text-gray-400 transition duration-300">
              <FaChartLine className="text-lg" />
              {isOpen && <span className="ml-4">المعاملات</span>}
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/reports" className="flex items-center text-lg hover:text-gray-400 transition duration-300">
              <FaChartLine className="text-lg" />
              {isOpen && <span className="ml-4">التقارير</span>}
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/alerts" className="flex items-center text-lg hover:text-gray-400 transition duration-300">
              <FaBell className="text-lg" />
              {isOpen && <span className="ml-4">التنبيهات</span>}
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/settings" className="flex items-center text-lg hover:text-gray-400 transition duration-300">
              <FaCog className="text-lg" />
              {isOpen && <span className="ml-4">الإعدادات</span>}
            </Link>
          </li>
          <li className="flex items-center">
            <Link to="/register" className="flex items-center text-lg hover:text-gray-400 transition duration-300">
              <FaUserPlus className="text-lg" />
              {isOpen && <span className="ml-4">تسجيل مستخدم جديد</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full p-4">
        <Link to="/logout" className="flex items-center text-lg hover:text-gray-400 transition duration-300">
          <FaSignOutAlt className="text-lg" />
          {isOpen && <span className="ml-4">تسجيل خروج</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
