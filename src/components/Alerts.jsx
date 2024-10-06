// src/components/Alerts.jsx
import React, { useState } from "react";

const Alerts = () => {
  // Example alert data, replace with real data fetching in the future
  const [alerts, setAlerts] = useState([
    { id: 1, message: "تنبيه: الحاوية رقم 101 تأخرت عن التسليم.", date: "2024-01-01" },
    { id: 2, message: "تنبيه: تم استلام الحاوية رقم 102.", date: "2024-01-02" }
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">التنبيهات</h1>
      <ul className="mt-4">
        {alerts.map((alert) => (
          <li key={alert.id} className="mt-4 bg-yellow-100 p-4 rounded">
            <p>{alert.message}</p>
            <span className="text-gray-500 text-sm">{alert.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
