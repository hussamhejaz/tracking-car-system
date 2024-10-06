// src/components/Settings.jsx
import React, { useState } from "react";

const Settings = () => {
  // Example setting state, add more as needed
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">الإعدادات</h1>
      <div className="mt-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleToggleNotifications}
            className="h-4 w-4"
          />
          <span>تمكين التنبيهات</span>
        </label>
      </div>
      {/* Add more settings here as needed */}
    </div>
  );
};

export default Settings;
