import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../lib/axiosInstance";
import { logout } from "../../redux/authSlice";

export default function AdminAccount() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState({ name: user.name, email: user.email });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  console.log("[DEBUG] Token used for API requests:", token);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/api/auth/admin/update-profile", admin);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/api/auth/admin/update-password", passwords);
      alert("Password updated successfully. Please log in again.");
      dispatch(logout());
      window.location.href = "/login";
    } catch (err) {
      alert("Failed to update password: " + err.message);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Account</h2>
      <p className="text-sm text-primary">
        Manage your admin account information here.
      </p>

      <form className="space-y-4" onSubmit={handleSave}>
        {/* Name */}
        <div className="flex flex-col">
          <label className="flex items-center gap-1 mb-1 text-sm text-primary">
            <User size={16} />
            Name
          </label>
          <input
            type="text"
            name="name"
            value={admin.name}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary/40"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="flex items-center gap-1 mb-1 text-sm text-primary">
            <Mail size={16} />
            Email
          </label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary/40"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark"
        >
          Save Changes
        </button>
      </form>

      {/* Change Password Form */}
      <form className="space-y-4 mt-8" onSubmit={handlePasswordSave}>
        <h3 className="text-lg font-semibold">Change Password</h3>
        <div className="flex flex-col">
          <label className="flex items-center gap-1 mb-1 text-sm text-primary">
            <Lock size={16} />
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary/40"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="flex items-center gap-1 mb-1 text-sm text-primary">
            <Lock size={16} />
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary/40"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
