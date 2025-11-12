import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not admin
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || !user.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-lime-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-green-700">
            Welcome, {user.name || "Administrator"}! 👋
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-semibold">Total Users</p>
            <p className="text-3xl font-bold text-green-900 mt-2">--</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-semibold">Total Orders</p>
            <p className="text-3xl font-bold text-blue-900 mt-2">--</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-semibold">Total Revenue</p>
            <p className="text-3xl font-bold text-purple-900 mt-2">--</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
            <p className="text-gray-600 text-sm font-semibold">Products</p>
            <p className="text-3xl font-bold text-orange-900 mt-2">--</p>
          </div>
        </div>

        {/* Admin Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-green-900 mb-4">🏢 Manage Users</h2>
            <p className="text-gray-600 mb-4">View and manage all system users</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Go to Users
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-green-900 mb-4">📦 Manage Products</h2>
            <p className="text-gray-600 mb-4">Add, edit, and delete products</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Go to Products
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-green-900 mb-4">📋 Manage Orders</h2>
            <p className="text-gray-600 mb-4">Track and manage all orders</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Go to Orders
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-green-900 mb-4">📊 Analytics</h2>
            <p className="text-gray-600 mb-4">View detailed analytics and reports</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Go to Analytics
            </button>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
          <h3 className="font-bold text-blue-900 mb-2">📌 Admin Status</h3>
          <p className="text-blue-800">
            ✅ You are logged in as an administrator with full system access.
          </p>
        </div>
      </div>
    </div>
  );
}
