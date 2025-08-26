"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, ArrowRight, Shield } from "lucide-react";

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword =
        "Password must contain uppercase, lowercase, and number";
    } else if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccess(false);

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
        setSuccess(true);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setErrors({
          general: data.message || data.error || "Password change failed",
        });
      }
    } catch (err) {
      console.error("Network error:", err);
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (success) setSuccess(false);
  };

  return (
    <div className="py-10 space-y-10">
      {/* My Info Section */}
      <section className="space-y-4 bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold">My Info</h2>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" defaultValue="Rima Akter" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input id="gender" placeholder="Enter your gender" defaultValue="Female" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              defaultValue="rima@example.com"
            />
            <Button variant="outline">Verify</Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="flex gap-2">
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              defaultValue="+880 1234 567890"
            />
            <Button variant="outline">Verify</Button>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700">Update Info</Button>
      </section>

      {/* Change Password Section */}
      <section className="space-y-6 bg-white shadow rounded-xl p-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
            <Shield className="w-7 h-7 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold">Change Password</h2>
          <p className="text-gray-600 text-sm">Update your password to keep your account secure</p>
        </div>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div>
            <Label className="pb-2">Current Password</Label>
            <div className="relative">
              <Input
                name="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value={formData.currentPassword}
                onChange={handleInputChange}
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              >
                {showCurrentPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <Label className="pb-2">New Password</Label>
            <div className="relative">
              <Input
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter your new password"
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
              <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label className="pb-2">Confirm New Password</Label>
            <div className="relative">
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
            
           <div className="bg-gray-50 p-4 rounded-lg">
  <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
  <ul className="text-xs text-gray-600 space-y-1">
    <li className="flex items-center">
      <div
        className={`w-2 h-2 rounded-full mr-2 ${
          formData.newPassword.length >= 6 ? "bg-green-500" : "bg-gray-300"
        }`}
      ></div>
      At least 6 characters
    </li>

    <li className="flex items-center">
      <div
        className={`w-2 h-2 rounded-full mr-2 ${
          /(?=.*[a-z])/.test(formData.newPassword) ? "bg-green-500" : "bg-gray-300"
        }`}
      ></div>
      One lowercase letter
    </li>

    <li className="flex items-center">
      <div
        className={`w-2 h-2 rounded-full mr-2 ${
          /(?=.*[A-Z])/.test(formData.newPassword) ? "bg-green-500" : "bg-gray-300"
        }`}
      ></div>
      One uppercase letter
    </li>

    <li className="flex items-center">
      <div
        className={`w-2 h-2 rounded-full mr-2 ${
          /(?=.*\d)/.test(formData.newPassword) ? "bg-green-500" : "bg-gray-300"
        }`}
      ></div>
      One number
    </li>
  </ul>
</div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? "Updating..." : "Update Password"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        </form>
      </section>
    </div>
  );
}
