import {
  Home,
  ShoppingCart,
  Box,
  Users,
  Mail,
  BarChart as BarChartIcon,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-primary/20 transition-colors text-sm ${
          isActive ? "bg-lime-50 shadow" : ""
        }`
      }
    >
      <div className="text-primary">{icon}</div>
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 md:block">
        <nav className="sticky space-y-3 top-20">
          <NavItem to="/admin" icon={<Home />} label="Dashboard" />
          <NavItem to="/admin/orders" icon={<ShoppingCart />} label="Orders" />
          <NavItem to="/admin/products" icon={<Box />} label="Products" />
          <NavItem to="/admin/messages" icon={<Mail />} label="Messages" />
          <NavItem to="/admin/users" icon={<Users />} label="Users" />
          <NavItem to="/admin/adminaccount" icon={<User />} label="Account" />
        </nav>
      </aside>

      {/* Mobile */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-y-0 left-0 z-40 w-64 p-4 shadow-xl bg-lime-50 md:hidden"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Menu</div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md"
          >
            X
          </button>
        </div>

        <nav className="space-y-3">
          <NavItem to="/admin" icon={<Home />} label="Dashboard" />
          <NavItem to="/admin/orders" icon={<ShoppingCart />} label="Orders" />
          <NavItem to="/admin/products" icon={<Box />} label="Products" />
          <NavItem to="/admin/users" icon={<Users />} label="Users" />
          <NavItem to="/admin/adminaccount" icon={<User />} label="Account" />
        </nav>
      </motion.aside>
    </>
  );
}
