"use client"
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, UserPlus } from 'lucide-react';

const SignupPage = ({ onNavigateToLogin }) => {
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone is required';
    } else if (!isValidEmailOrPhone(formData.emailOrPhone)) {
      newErrors.emailOrPhone = 'Please enter a valid email or phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const isValidEmailOrPhone = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return emailRegex.test(value) || phoneRegex.test(value.replace(/\s/g, ''));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully!');
        onNavigateToLogin();
      } else {
        setErrors({ general: data.message || 'Signup failed' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!validateForm()) return;

//   setLoading(true);

//   try {
//     const bodyData = {
//       name: formData.name,
//       password: formData.password,
//     };
//     if (formData.emailOrPhone) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
//       const val = formData.emailOrPhone.replace(/\s/g, '');

//       if (emailRegex.test(val)) {
//         bodyData.email = val;
//       } else if (phoneRegex.test(val)) {
//         bodyData.phone = val;
//       }
//     }

//     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(bodyData),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       alert('Account created successfully!');
//       onNavigateToLogin();
//     } else {
//       setErrors({ general: data.message || 'Signup failed' });
//     }
//   } catch (error) {
//     setErrors({ general: 'Network error. Please try again.' });
//   } finally {
//     setLoading(false);
//   }
// };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
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
              <button
                onClick={onNavigateToLogin}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
