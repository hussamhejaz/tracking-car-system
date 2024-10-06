import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Drivers from "./components/Drivers";
import Containers from "./components/Containers";
import Transactions from "./components/Transactions";
import Reports from "./components/Reports";
import Alerts from "./components/Alerts";
import Settings from "./components/Settings";
import Register from "./components/Register";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Main content */}
        <div
          className={`flex-1 p-8 overflow-y-auto bg-gray-100 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/containers" element={<Containers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/register" element={<Register />} /> {/* Ensure this route exists */}

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
