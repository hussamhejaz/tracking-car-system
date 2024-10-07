import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Containers = () => {
  const [containers, setContainers] = useState([]);
  const [newContainer, setNewContainer] = useState({
    containerNo: "",
    containerType: "",
    containerSize: "",
    contents: "",
    status: "In Transit", // Default status
    imageUrl: "", // Initially empty
  });
  const [showConfirm, setShowConfirm] = useState(false); // Control modal visibility
  const [containerToDelete, setContainerToDelete] = useState(null); // Track container to delete

  // Fetch containers from the backend
  useEffect(() => {
    fetchContainers();
  }, []);

  const fetchContainers = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/containers/all");
      if (!response.ok) {
        throw new Error("Failed to fetch containers");
      }
      const data = await response.json();
      setContainers(data);
    } catch (error) {
      console.error("Error fetching containers:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContainer({
      ...newContainer,
      [name]: value,
    });
  };

  // Handle form submission to add a new container
  const handleAddContainer = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!newContainer.containerNo || !newContainer.containerType || !newContainer.containerSize || !newContainer.contents) {
      toast.error("All fields except status and image_url are required");
      return;
    }

    const containerData = {
      container_no: newContainer.containerNo,
      container_type: newContainer.containerType,
      container_size: newContainer.containerSize,
      contents: newContainer.contents,
      status: newContainer.status,
      image_url: newContainer.imageUrl || null,
    };

    try {
      const response = await fetch("http://localhost:5001/api/containers/addContainer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(containerData),
      });

      if (!response.ok) {
        throw new Error("Error adding container");
      }

      const data = await response.json();
      console.log("Container added:", data);

      // Reset form after successful submission
      setNewContainer({
        containerNo: "",
        containerType: "",
        containerSize: "",
        contents: "",
        status: "In Transit",
        imageUrl: "",
      });

      // Fetch the updated list of containers
      fetchContainers();
      toast.success("تم إضافة الحاوية بنجاح!");
    } catch (error) {
      console.error("Error:", error);
      toast.error("فشل في إضافة الحاوية");
    }
  };

  // Show confirmation modal before deletion
  const confirmDelete = (id) => {
    setContainerToDelete(id);
    setShowConfirm(true);
  };

  // Handle container deletion
  const handleDeleteContainer = async () => {
    if (containerToDelete) {
      try {
        const response = await fetch(`http://localhost:5001/api/containers/delete/${containerToDelete}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Error deleting container");
        }

        const data = await response.json();
        console.log("Container deleted:", data);

        // Fetch the updated list of containers
        fetchContainers();
        setShowConfirm(false); // Close the modal after deletion
        setContainerToDelete(null); // Reset the container to delete

        // Show toast notification
        toast.success("تم حذف الحاوية بنجاح!");
      } catch (error) {
        console.error("Error:", error);
        toast.error("فشل في حذف الحاوية");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-6 text-gray-800 text-right">الحاويات</h1>

      {/* Form to add new container */}
      <form onSubmit={handleAddContainer} className="mb-6 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-right">إضافة حاوية جديدة</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-right text-gray-700">رقم الحاوية</label>
            <input
              type="text"
              name="containerNo"
              value={newContainer.containerNo}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-right text-gray-700">نوع الحاوية</label>
            <input
              type="text"
              name="containerType"
              value={newContainer.containerType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-right text-gray-700">حجم الحاوية</label>
            <input
              type="text"
              name="containerSize"
              value={newContainer.containerSize}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-right text-gray-700">المحتويات</label>
            <input
              type="text"
              name="contents"
              value={newContainer.contents}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-right text-gray-700">الحالة</label>
            <select
              name="status"
              value={newContainer.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="In Transit">في النقل</option>
              <option value="Delivered">تم التسليم</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          إضافة الحاوية
        </button>
      </form>

      {/* Display existing containers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {containers.map((container) => (
          <div key={container.CONTAINER_ID} className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 text-right">
              الحاوية {container.CONTAINER_NO} - {container.CONTAINER_TYPE}
            </h2>
            <p className="mt-2 text-gray-600 text-right">
              <strong>المحتويات:</strong> {container.CONTENTS || "لا توجد محتويات"}
            </p>
            <p className="mt-2 text-gray-600 text-right">
              <strong>الحجم:</strong> {container.CONTAINER_SIZE || "لا يوجد حجم"}
            </p>

            {/* Status */}
            <div className="mt-4 text-right">
              {container.STATUS === "In Transit" ? (
                <div className="flex items-center justify-end space-x-2 flex-row-reverse">
                  <span className="text-yellow-600 font-semibold">في النقل</span>
                </div>
              ) : (
                <div className="flex items-center justify-end space-x-2 flex-row-reverse">
                  <span className="text-green-600 font-semibold">تم التسليم</span>
                </div>
              )}
            </div>

            {/* Image Display */}
            <div className="mt-4 text-right">
              {container.IMAGE_URL ? (
                <img src={container.IMAGE_URL} alt={`Container ${container.CONTAINER_NO}`} className="w-full h-32 object-cover rounded-lg shadow-md" />
              ) : (
                <p className="text-gray-600">لا توجد صورة</p>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => confirmDelete(container.CONTAINER_ID)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              حذف الحاوية
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold mb-4">هل أنت متأكد أنك تريد حذف هذه الحاوية؟</h3>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteContainer}
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
    </div>
  );
};

export default Containers;