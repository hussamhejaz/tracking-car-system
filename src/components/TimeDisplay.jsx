import React, { useState, useEffect } from "react";

const TimeDisplay = () => {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Formatting the date and time
  const formattedTime = clock.toLocaleTimeString();
  const formattedDate = clock.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md w-full flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">{formattedTime}</h1>
      <p className="text-xl font-medium text-gray-500">{formattedDate}</p>
    </div>
  );
};

export default TimeDisplay;
