"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(true);
  const [otpError, setOtpError] = useState("");

  const router = useRouter()
// Validate email or phone without changing state
  const getEmailPhone = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return {
    email: emailRegex.test(value) ? value : '',
    phone: phoneRegex.test(value.replace(/\s/g, '')) ? value : '',
    valid: emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ''))
  };
  };

  const validateForm = () => {
  const newErrors = {};
  const { email, phone, valid } = getEmailPhone(formData.emailOrPhone);

  if (!formData.name.trim()) newErrors.name = 'Name is required';
  else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

  if (!formData.emailOrPhone.trim()) newErrors.emailOrPhone = 'Email or phone is required';
  else if (!valid) newErrors.emailOrPhone = 'Please enter a valid email or phone number';

  if (!formData.password) newErrors.password = 'Password is required';
  else if (formData.password.length < 6)
    newErrors.password = 'Password must be at least 6 characters';
  else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
    newErrors.password = 'Password must contain uppercase, lowercase, and number';

  if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
  else if (formData.password !== formData.confirmPassword)
    newErrors.confirmPassword = 'Passwords do not match';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  const { email, phone } = getEmailPhone(formData.emailOrPhone);

  const payload = {
    name: formData.name,
    password: formData.password,
    ...(email && { email }),
    ...(phone && { phone })
  };
  setLoading(true);
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "x-vendor-identifier": "cmdodf60l000028vh5otnn9fg" 
       },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (response.ok) {
      setShowOtpModal(true);
      alert('Account created successfully!');
    } else {
      setErrors({ general: data.error || data.massage ||'Signup failed' });
    }
  } catch {
    setErrors({ general: 'Network error. Please try again.' });
  } finally {
    setLoading(false);
  }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 pt-8 pb-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <UserPlus className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">Join us today and get started</p>
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-white focus:bg-white'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Email/Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email or Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="emailOrPhone"
                    type="text"
                    value={formData.emailOrPhone}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.emailOrPhone ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-white focus:bg-white'
                    }`}
                    placeholder="Enter your email or phone number"
                  />
                </div>
                {errors.emailOrPhone && <p className="mt-2 text-sm text-red-600">{errors.emailOrPhone}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-white focus:bg-white'
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-white focus:bg-white'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login"><button
                className="text-blue-600 hover:text-blue-700 cursor-pointer hover:underline font-medium transition-colors duration-200"
              >
                Sign in here
              </button></Link>
            </p>
          </div>
        </div>
      </div>
      {/* {showOtpModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>

      <div className="flex justify-center gap-2 mb-4">
        {[0,1,2,3,4,5].map((i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            className="w-10 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            value={otp[i] || ""}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/, "");
              setOtp(prev => {
                const newOtp = [...prev];
                newOtp[i] = val;
                return newOtp;
              });
              if (val && i < 5) {
                const nextInput = document.querySelector(`input[name=otp-${i+1}]`);
                nextInput?.focus();
              }
            }}
            name={`otp-${i}`}
          />
        ))}
      </div>
      {otpError && <p className="text-red-600 text-sm mb-2">{otpError}</p>}
      <button
        disabled={otp.length !== 6}
        onClick={async () => {
          
          const { email, phone } = getEmailPhone(formData.emailOrPhone);

          if (otp.join("").length !== 6) {
            setOtpError("Enter valid 6-digit OTP");
            return;
          }
          const payload = {
            otp: otp.join("")
          };

          if (email) {
            payload.email = email;
          } else {
            payload.phone = phone;
          }

          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/user/${email ? "verify-email" : "verify-phone"}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
              alert("Signup & OTP verification successful! You can login now.");
              router.push("/")
              setShowOtpModal(false);
            } else {
              setOtpError(data.message || "OTP verification failed");
            }
          } catch {
            setOtpError("Network error. Try again.");
          }
        }}
        className={`${otp.length !== 6 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} w-full text-white py-3 rounded-lg mt-4 mb-2 transition-colors`}
      >
        Verify OTP
      </button>

      <button
        onClick={() => setShowOtpModal(false)}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg transition-colors"
      >
        Cancel
      </button>
    </div>
  </div>
)} */}

    </div>
    
  );
};

export default SignupPage;
