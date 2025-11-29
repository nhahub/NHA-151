import { useState } from "react";
import { motion } from "framer-motion";
import AdminNavbar from "../Pages/AdminDashboard/AdminNavbar";
import AdminSidebar from "../Pages/AdminDashboard/AdminSidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen text-gray-800 bg-primary/10">
      {/* Navbar */}
      <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Layout */}
      <div className="flex gap-6 px-4 pt-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Sidebar */}
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
