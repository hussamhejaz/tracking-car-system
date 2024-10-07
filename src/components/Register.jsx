import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phoneNo: "", // Add phone number field
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "اسم المستخدم مطلوب";
    }
    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل";
    }
    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "رقم الهاتف مطلوب";
    } else if (!/^[0-9]{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = "رقم الهاتف غير صالح";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("يرجى تصحيح الأخطاء قبل المتابعة");
    } else {
      try {
        const response = await fetch("http://localhost:5001/api/driver/addDriver", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phone_no: formData.phoneNo, // Send phone number with request
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add driver");
        }

        const result = await response.json();
        console.log("Driver added:", result);

        toast.success("تم إضافة السائق بنجاح!");
        setErrors({});
        setFormData({
          username: "",
          email: "",
          password: "",
          phoneNo: "",
        });
      } catch (error) {
        console.error("Error adding driver:", error);
        toast.error("حدث خطأ أثناء إضافة السائق");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-md bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-6">
          تسجيل سائق جديد
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="sr-only">اسم المستخدم</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FaUser />
              </span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full py-3 pl-10 pr-4 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 transition duration-200`}
                placeholder="أدخل اسم المستخدم"
                required
              />
              {errors.username && <p className="mt-2 text-sm text-red-500">{errors.username}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">البريد الإلكتروني</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full py-3 pl-10 pr-4 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 transition duration-200`}
                placeholder="أدخل البريد الإلكتروني"
                required
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">كلمة المرور</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full py-3 pl-10 pr-4 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 transition duration-200`}
                placeholder="أدخل كلمة المرور"
                required
              />
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="phoneNo" className="sr-only">رقم الهاتف</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FaPhone />
              </span>
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                className={`w-full py-3 pl-10 pr-4 border ${errors.phoneNo ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring focus:ring-blue-200 focus:border-blue-500 transition duration-200`}
                placeholder="أدخل رقم الهاتف"
                required
              />
              {errors.phoneNo && <p className="mt-2 text-sm text-red-500">{errors.phoneNo}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 transition duration-200"
          >
            إضافة
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;