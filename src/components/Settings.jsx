import React, { useState } from "react";
import { FaBell, FaMoon } from "react-icons/fa";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">الإعدادات</h1>

      <div className="space-y-6">
        {/* Notifications Setting */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaBell className="text-gray-500" />
              <span className="text-lg font-medium text-gray-700">تمكين التنبيهات</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={notificationsEnabled}
                onChange={handleToggleNotifications}
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-focus:ring-4 peer-focus:ring-blue-200 dark:bg-gray-700 peer-checked:bg-blue-600 transition-all duration-300"></div>
              <span className="w-6 h-6 bg-white absolute top-0.5 left-[2px] rounded-full transition-all duration-300 transform peer-checked:translate-x-full peer-checked:left-auto peer-checked:right-[2px]"></span>
            </label>
          </div>
        </div>

        {/* Dark Mode Setting */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaMoon className="text-gray-500" />
              <span className="text-lg font-medium text-gray-700">الوضع الداكن</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={darkMode}
                onChange={handleToggleDarkMode}
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer-focus:ring-4 peer-focus:ring-blue-200 dark:bg-gray-700 peer-checked:bg-blue-600 transition-all duration-300"></div>
              <span className="w-6 h-6 bg-white absolute top-0.5 left-[2px] rounded-full transition-all duration-300 transform peer-checked:translate-x-full peer-checked:left-auto peer-checked:right-[2px]"></span>
            </label>
          </div>
        </div>

        {/* Add more settings here */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-medium text-gray-700 mb-2">إعدادات أخرى</h2>
          <p className="text-gray-500">يمكنك إضافة إعدادات إضافية هنا.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
