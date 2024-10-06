// src/components/Drivers.jsx
import React, { useState } from "react";

const Drivers = () => {
  const [drivers, setDrivers] = useState([
    { id: 1, name: "سائق 1", available: true },
    { id: 2, name: "سائق 2", available: false }
  ]);

  const assignContainer = (driverId) => {
    // Add logic to assign a container to a driver
    console.log(`Assign container to driver ${driverId}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">السائقون</h1>
      <ul className="mt-4">
        {drivers.map((driver) => (
          <li key={driver.id} className="mt-4">
            {driver.name} - {driver.available ? "متاح" : "غير متاح"}
            <button
              onClick={() => assignContainer(driver.id)}
              className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              تخصيص حاوية
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Drivers;
