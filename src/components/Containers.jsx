// src/components/Containers.jsx
import React, { useState } from "react";

const Containers = () => {
  const [containers, setContainers] = useState([
    { id: 101, contents: "بضائع 1", status: "في النقل", driver: "سائق 1" },
    { id: 102, contents: "بضائع 2", status: "تم التسليم", driver: "سائق 2" }
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">الحاويات</h1>
      <ul className="mt-4">
        {containers.map((container) => (
          <li key={container.id} className="mt-4">
            الحاوية {container.id} - {container.contents} - {container.status} -{" "}
            {container.driver}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Containers;
