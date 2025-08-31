"use client";

import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = ({ onBackToLogin, resetToken }) => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams()
  const token = searchParams.get("token");
  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-vendor-identifier": "cmdodf60l000028vh5otnn9fg",
          },
          body: JSON.stringify({
            token,
            email: formData.email,
            newPassword: formData.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ newPassword: "", confirmPassword: "" });
      } else {
        setErrors({ general: data.message || "Reset failed" });
      }
    } catch (err) {
      console.error("Network error:", err);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Set New Password
              </h1>
              <p className="text-gray-600">
                Please create a strong new password to secure your account.
              </p>
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {errors.general}
              </div>
            )}

            {success ? (
              <div className="text-center">
                <p className="text-green-600 font-medium mb-4">
                  ✅ Password updated successfully!
                </p>
                <button
                  onClick={onBackToLogin}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 pb-2">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your  email"
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.newPassword
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-gray-50 hover:bg-white focus:bg-white"
                        }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 pb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter your new password"
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.newPassword
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-gray-50 hover:bg-white focus:bg-white"
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                    >
                      {showNewPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 pb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your new password"
                      className={`w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300 bg-gray-50 hover:bg-white focus:bg-white"
                        }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Password Requirements:
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${formData.newPassword.length >= 6
                            ? "bg-green-500"
                            : "bg-gray-300"
                          }`}
                      ></div>
                      At least 6 characters
                    </li>
                    <li className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${/(?=.*[a-z])/.test(formData.newPassword)
                            ? "bg-green-500"
                            : "bg-gray-300"
                          }`}
                      ></div>
                      One lowercase letter
                    </li>
                    <li className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${/(?=.*[A-Z])/.test(formData.newPassword)
                            ? "bg-green-500"
                            : "bg-gray-300"
                          }`}
                      ></div>
                      One uppercase letter
                    </li>
                    <li className="flex items-center">
                      <div
                        className={`w-2 h-2 rounded-full mr-2 ${/(?=.*\d)/.test(formData.newPassword)
                            ? "bg-green-500"
                            : "bg-gray-300"
                          }`}
                      ></div>
                      One number
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      Update Password
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
