"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Lock, ArrowRight, Shield, Check } from "lucide-react";
import Link from "next/link";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Password strength indicators
  const getPasswordStrength = (password) => {
    const checks = [
      { test: /.{8,}/, label: "At least 8 characters" },
      { test: /[A-Z]/, label: "One uppercase letter" },
      { test: /[a-z]/, label: "One lowercase letter" },
      { test: /[0-9]/, label: "One number" },
      { test: /[^A-Za-z0-9]/, label: "One special character" },
    ];

    return checks.map(check => ({
      ...check,
      passed: check.test.test(password)
    }));
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);
  const strengthScore = passwordStrength.filter(check => check.passed).length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    // Clear general error
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    try {
      changePasswordDTOSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("✅ Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        
        // Optional: Show success for a few seconds then redirect
        setTimeout(() => {
          // Redirect to dashboard or login page
          window.location.href = '/dashboard';
        }, 2000);
        
      } else {
        // Handle different error status codes
        if (response.status === 401) {
          setErrors({ general: "Current password is incorrect" });
        } else if (response.status === 400) {
          setErrors({ general: data.message || "Invalid request data" });
        } else if (response.status === 403) {
          setErrors({ general: "Access denied. Please login again." });
        } else {
          setErrors({ general: data.message || "Failed to change password" });
        }
      }
    } catch (err) {
      console.error("Network error:", err);
      setErrors({ general: "⚠️ Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (strengthScore <= 2) return "bg-red-500";
    if (strengthScore <= 3) return "bg-yellow-500";
    if (strengthScore <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strengthScore <= 2) return "Weak";
    if (strengthScore <= 3) return "Fair";
    if (strengthScore <= 4) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Change Password
              </h1>
              <p className="text-gray-600">
                Update your password to keep your account secure
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
              {/* Current Password */}
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPasswords.currentPassword ? "text" : "password"}
                    required
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.currentPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white focus:bg-white"
                    }`}
                    placeholder="Enter your current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("currentPassword")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPasswords.currentPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showPasswords.newPassword ? "text" : "password"}
                    required
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.newPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white focus:bg-white"
                    }`}
                    placeholder="Enter your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("newPassword")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPasswords.newPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.newPassword}
                  </p>
                )}

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Password strength:</span>
                      <span className={`text-xs font-medium ${
                        strengthScore <= 2 ? 'text-red-600' :
                        strengthScore <= 3 ? 'text-yellow-600' :
                        strengthScore <= 4 ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(strengthScore / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="space-y-1">
                      {passwordStrength.map((check, index) => (
                        <div key={index} className="flex items-center text-xs">
                          <Check className={`h-3 w-3 mr-2 ${
                            check.passed ? 'text-green-500' : 'text-gray-300'
                          }`} />
                          <span className={check.passed ? 'text-green-600' : 'text-gray-500'}>
                            {check.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.confirmPassword
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white focus:bg-white"
                    }`}
                    placeholder="Confirm your new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPasswords.confirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Change Password
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Want to go back?{" "}
              <Link href="/dashboard">
                <button className="text-blue-600 hover:underline cursor-pointer hover:text-blue-700 font-medium transition-colors duration-200">
                  Return to Dashboard
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;