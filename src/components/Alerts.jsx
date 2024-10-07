import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa"; // Using an alert icon

const Alerts = () => {
  // Example alert data, replace with real data fetching in the future
  const [alerts] = useState([
    { id: 1, message: "تنبيه: الحاوية رقم 101 تأخرت عن التسليم.", date: "2024-01-01" },
    { id: 2, message: "تنبيه: تم استلام الحاوية رقم 102.", date: "2024-01-02" },
  ]);

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-right">التنبيهات</h1>
      <ul className="space-y-6">
        {alerts.map((alert) => (
          <li
            key={alert.id}
            className="flex flex-row-reverse items-start bg-yellow-100 p-4 rounded-lg shadow-md border border-yellow-300"
          >
            {/* Icon */}
            <div className="flex-shrink-0 ml-4">
              <FaExclamationCircle className="text-yellow-600 text-3xl" />
            </div>

            {/* Alert Content */}
            <div className="flex-1 text-right">
              <p className="text-lg font-semibold text-yellow-800">{alert.message}</p>
              <span className="text-gray-500 text-sm block mt-1">{alert.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
