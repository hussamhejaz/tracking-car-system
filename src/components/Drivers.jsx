import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaSearch, FaTrashAlt } from "react-icons/fa"; // Added icons
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);

  // Fetch drivers from the backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/driver/getDrivers");
        if (!response.ok) {
          throw new Error("Failed to fetch drivers");
        }
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  // Function to assign a container to a driver (placeholder)
  const assignContainer = (driverId) => {
    // Placeholder logic for assigning container
    console.log(`Assign container to driver ${driverId}`);
  };

  // Open confirmation dialog for deleting a driver
  const handleDeleteClick = (driverId) => {
    setDriverToDelete(driverId);
    setShowConfirm(true);
  };

  // Confirm deletion of the driver
  const handleDeleteDriver = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/driver/deleteDriver/${driverToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete driver");
      }

      // Remove the deleted driver from the state
      setDrivers(drivers.filter((driver) => driver.DRIVER_ID !== driverToDelete));
      toast.success("تم حذف السائق بنجاح");
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast.error("فشل حذف السائق");
    } finally {
      setShowConfirm(false);
      setDriverToDelete(null);
    }
  };

  // Filter drivers based on search term and availability
  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch = driver.USERNAME && driver.USERNAME.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = !showAvailableOnly || driver.STATUS === "Available";
    return matchesSearch && matchesAvailability;
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-right">السائقون</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث عن سائق..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Availability Filter */}
        <div className="flex items-center">
          <label className="text-gray-700 mr-2">عرض السائقين المتاحين فقط</label>
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={(e) => setShowAvailableOnly(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
          />
        </div>
      </div>

      {/* Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.length > 0 ? (
          filteredDrivers.map((driver) => (
            <div key={driver.DRIVER_ID} className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
              {/* Driver Info */}
              <div className="flex items-center space-x-4 flex-row-reverse">
                <div className="text-right">
                  <h2 className="text-xl font-semibold text-gray-700">{driver.USERNAME}</h2>
                  <p className="text-gray-500">رقم الهاتف: {driver.PHONE_NO}</p>
                  <div className="flex items-center space-x-2 flex-row-reverse">
                    {driver.STATUS === "Available" ? (
                      <>
                        <FaCheckCircle className="text-green-500" />
                        <span className="text-green-500 font-medium">متاح</span>
                      </>
                    ) : (
                      <>
                        <FaTimesCircle className="text-red-500" />
                        <span className="text-red-500 font-medium">غير متاح</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex justify-between">
                {/* Assign Container Button */}
                <button
                  onClick={() => assignContainer(driver.DRIVER_ID)}
                  className={`px-4 py-2 text-white font-semibold rounded-md transition duration-300 ${
                    driver.STATUS === "Available" ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={driver.STATUS !== "Available"}
                >
                  تخصيص حاوية
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteClick(driver.DRIVER_ID)}
                  className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 font-semibold rounded-md transition duration-300"
                >
                  <FaTrashAlt className="inline-block mr-2" />
                  حذف
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">لم يتم العثور على سائقين مطابقين.</p>
        )}
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">هل أنت متأكد أنك تريد حذف هذا السائق؟</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteDriver}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
              >
                نعم، حذف
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Drivers;
