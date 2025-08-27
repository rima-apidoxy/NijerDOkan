"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, KeyRound } from "lucide-react";
import Link from "next/link";

const ForgetPasswordPage = () => {
  const [formData, setFormData] = useState({
    identifier: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const isValidEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return {
      email: emailRegex.test(value) ? value : "",
      phone: phoneRegex.test(value.replace(/\s/g, '')) ? value : '',
      valid: emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ""))
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or phone is required";
    } else if (!isValidEmailOrPhone(formData.identifier)) {
      newErrors.identifier = "Please enter a valid email or phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ identifier: e.target.value });
    if (errors.identifier) {
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return alert("hoi nai");

  setLoading(true);
  setErrors({});
  setSuccessMessage("");

  const parsed = isValidEmailOrPhone(formData.identifier);

  const payload = {};
  if (parsed.email) payload.email = parsed.email;
  if (parsed.phone) payload.phone = parsed.phone;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/forget-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-vendor-identifier": "cmdodf60l000028vh5otnn9fg",
        },
        body: JSON.stringify(payload), 
      }
    );

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage(
        "Password reset link has been sent to your email / phone."
      );
      setFormData({ identifier: "" });
    } else {
      setErrors({ general: data.error || data.message || "Failed to send reset link" });
    }
  } catch (err) {
    setErrors({ general: "⚠️ Network error. Please try again." });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <KeyRound className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Forgot Password
              </h1>
              <p className="text-gray-600">
                Enter your registered email or phone to reset your password
              </p>
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {errors.general}
              </div>
            )}

            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email or Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    required
                    value={formData.identifier}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.identifier
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white focus:bg-white"
                    }`}
                    placeholder="Enter your email / phone"
                  />
                </div>
                {errors.identifier && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.identifier}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Remembered your password?{" "}
              <Link href="/auth/login">
                <button className="text-blue-600 hover:underline cursor-pointer hover:text-blue-700 font-medium transition-colors duration-200">
                  Back to Login
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
