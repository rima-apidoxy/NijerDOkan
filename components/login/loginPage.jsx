"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    fingerprint: undefined,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const isValidEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ""));
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or phone is required";
    } else if (!isValidEmailOrPhone(formData.identifier)) {
      newErrors.identifier = "Please enter a valid email or phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    console.log(formData)
    try {
      const response = await fetch(`${process.envNEXT_PUBLIC_BASE_URL}/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-vendor-identifier": "cmev38g4z000064vhktlpkq9z"
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Login successful:", data);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        alert("Login successful!");
        router.push("/")
        // handle token store or redirect
      } else {
        console.error(" Login failed:", data);
        setErrors({ general: data.message || "Login failed" });
      }
    } catch (err) {
      console.error("Network error:", err);
      setErrors({ general: "Network error. Please try again." });
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
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Identifier */}
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
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.identifier
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

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.password
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 bg-gray-50 hover:bg-white focus:bg-white"
                      }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link href="/auth/forget-password">
                  <button
                    type="button"
                    className="text-sm text-blue-600 cursor-pointer hover:underline hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Forgot Password?
                  </button></Link>              </div>

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
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/signup"><button
                className="text-blue-600 hover:underline cursor-pointer hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Sign up here
              </button></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
