import React, { useState } from "react";
import { FaTruck, FaCalendarAlt, FaBox, FaArrowRight, FaMapMarkerAlt, FaSearch, FaTimes } from "react-icons/fa"; // Added close icon

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [transactions] = useState([
    {
      containerId: 101,
      transfers: [
        {
          fromDriver: "سائق 1",
          toDriver: "سائق 2",
          date: "2024-01-01",
          location: "الرياض، السعودية",
          coordinates: { lat: 24.7136, lng: 46.6753 },
          notes: "تم نقل الحاوية في حالة ممتازة.",
          imageUrl: "https://via.placeholder.com/150" // Example image URL
        },
        {
          fromDriver: "سائق 2",
          toDriver: "سائق 3",
          date: "2024-01-03",
          location: "جدة، السعودية",
          coordinates: { lat: 21.4858, lng: 39.1925 },
          notes: "تم التأكيد على سلامة الشحنة.",
          imageUrl: "https://via.placeholder.com/150" // Example image URL
        }
      ]
    },
    {
      containerId: 102,
      transfers: [
        {
          fromDriver: "سائق 4",
          toDriver: "سائق 5",
          date: "2024-01-02",
          location: "مكة، السعودية",
          coordinates: { lat: 21.4225, lng: 39.8262 },
          notes: "الحاوية تحتوي على مواد حساسة.",
          imageUrl: "https://via.placeholder.com/150" // Example image URL
        }
      ]
    }
  ]);

  // Handle search filtering
  const filteredTransactions = transactions.filter(transaction =>
    transaction.containerId.toString().includes(searchTerm)
  );

  // Function to close the modal
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-right">المعاملات</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-end">
        <div className="relative w-full max-w-sm">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث برقم الحاوية..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      <ul className="space-y-8">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => (
            <li key={transaction.containerId} className="bg-white p-6 rounded-lg shadow-lg">
              {/* Container Info */}
              <div className="flex justify-between items-center flex-row-reverse">
                <h2 className="text-2xl font-semibold text-gray-700 text-right">
                  <FaBox className="inline-block text-yellow-500" /> الحاوية رقم{" "}
                  {transaction.containerId}
                </h2>
              </div>

              {/* Transfer History */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-700 text-right mb-4">سجل النقل</h3>
                <div className="space-y-4">
                  {transaction.transfers.map((transfer, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 border-l-4 border-yellow-400 rounded-lg"
                    >
                      <div className="flex flex-row-reverse justify-between">
                        <p className="text-right text-lg font-medium text-gray-800">
                          <FaTruck className="inline-block" /> من {transfer.fromDriver}{" "}
                          <FaArrowRight className="inline-block text-gray-600 mx-2" /> إلى{" "}
                          {transfer.toDriver}
                        </p>
                        <div className="text-gray-500">
                          <FaCalendarAlt className="inline-block" /> {transfer.date}
                        </div>
                      </div>
                      <p className="text-gray-600 text-right mt-2">
                        <strong>الموقع:</strong> {transfer.location}{" "}
                        <a
                          href={`https://www.google.com/maps?q=${transfer.coordinates.lat},${transfer.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          <FaMapMarkerAlt className="inline-block" /> عرض الموقع
                        </a>
                      </p>
                      <p className="text-gray-600 text-right mt-2">
                        <strong>ملاحظات:</strong> {transfer.notes}
                      </p>

                      {/* Container Image */}
                      {transfer.imageUrl && (
                        <div className="mt-4 text-right">
                          <img
                            src={transfer.imageUrl}
                            alt={`صورة الحاوية ${transaction.containerId}`}
                            className="w-32 h-32 object-cover rounded-lg shadow-md border border-gray-300 hover:opacity-75 cursor-pointer"
                            onClick={() => setSelectedImage(transfer.imageUrl)} // Open modal on click
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-600 text-center">لا توجد نتائج مطابقة لرقم الحاوية.</p>
        )}
      </ul>

      {/* Modal for Image */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-5xl w-full"> {/* Increased width */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={closeModal}
            >
              <FaTimes size={20} />
            </button>
            <img
              src={selectedImage}
              alt="Full size container"
              className="w-full h-auto max-h-[90vh]" // Maximum height is now 90% of the viewport height
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
