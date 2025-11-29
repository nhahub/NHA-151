import React, { useMemo, useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import axiosInstance from "../../lib/axiosInstance";

// ----------------------
// Helpers / UI utilities
// ----------------------
function getFirstName(fullName) {
  if (!fullName) return "";
  return String(fullName).trim().split(/\s+/)[0] || fullName;
}

function shortenEmail(email) {
  if (!email) return "";
  const s = String(email);
  if (s.length <= 18) return s;
  const parts = s.split("@");
  if (parts.length < 2) return s;
  const local = parts[0];
  const domain = parts.slice(1).join("@");
  // Keep domain visible, truncate local part with ellipsis
  const maxLocal = Math.max(3, 18 - domain.length - 1); // reserve for @ and domain
  const visibleLocal = local.length > maxLocal ? local.slice(0, Math.max(3, maxLocal)) + "…" : local;
  return `${visibleLocal}@${domain}`;
}

function TrimCell({ text, className = "", maxWidth = "160px" }) {
  return (
    <div
      className={`truncate ${className}`}
      title={typeof text === "string" ? text : String(text)}
      style={{ maxWidth }}
    >
      {text}
    </div>
  );
}

// ==========================
// Admin Dashboard Content
// Only main content, no header/sidebar
// ==========================
export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);
  const [userGrowth, setUserGrowth] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchOverview = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get("/api/admin/analytics/overview");
        if (!mounted) return;
        const data = res.data || {};
        setTotalUsers(data.totalUsers || 0);
        setTotalOrders(data.totalOrders || 0);
        setTotalRevenue(data.totalRevenue || 0);
        setTotalProducts(data.totalProducts || 0);
        setMonthlySales(Array.isArray(data.monthlySales) ? data.monthlySales : []);
        setUserGrowth(Array.isArray(data.monthlyUserGrowth) ? data.monthlyUserGrowth : []);
        setRecentOrders(Array.isArray(data.latestOrders) ? data.latestOrders : []);
        setRecentUsers(Array.isArray(data.recentUsers) ? data.recentUsers : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load analytics");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchOverview();
    return () => {
      mounted = false;
    };
  }, []);

  // Process recent orders: sort by createdAt DESC and assign human friendly incremental numbers starting at 1
  const processedRecentOrders = React.useMemo(() => {
    if (!Array.isArray(recentOrders)) return [];
    const arr = [...recentOrders];
    arr.sort((a, b) => {
      const da = a?.createdAt ? new Date(a.createdAt) : 0;
      const db = b?.createdAt ? new Date(b.createdAt) : 0;
      return db - da; // desc
    });
    return arr.map((o, idx) => ({ ...o, displayOrderNumber: `#${idx + 1}` }));
  }, [recentOrders]);

  const processedRecentUsers = React.useMemo(() => {
    if (!Array.isArray(recentUsers)) return [];
    const arr = [...recentUsers];
    arr.sort((a, b) => {
      const da = a?.createdAt ? new Date(a.createdAt) : 0;
      const db = b?.createdAt ? new Date(b.createdAt) : 0;
      return db - da;
    });
    return arr.map((u) => ({
      ...u,
      firstName: getFirstName(u.name || u.fullName || (u.user && u.user.name) || ""),
      shortEmail: shortenEmail(u.email),
    }));
  }, [recentUsers]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-sm text-primary">
          Welcome back — here’s what happened recently.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value={totalUsers} />
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Total Revenue" value={`$${Number(totalRevenue || 0).toFixed(2)}`} />
        <StatCard title="Total Products" value={totalProducts} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Monthly Sales Chart */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <LineChartIcon />
                <h3 className="text-lg font-medium">Monthly Sales</h3>
              </div>
              <div className="text-sm text-primary">Last 12 months</div>
            </div>
            <div className="w-full">
              <ResponsiveContainer width="100%" aspect={2}>
                <LineChart data={monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3c6300"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* User Growth Chart */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChartIcon />
                <h3 className="text-lg font-medium">User Growth</h3>
              </div>
              <div className="text-sm text-primary">Monthly</div>
            </div>
            <div className="w-full">
              <ResponsiveContainer width="100%" aspect={1.5}>
                <BarChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" barSize={12} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Orders and Users */}
        <div className="space-y-6">
          <Card>
            <h3 className="mb-3 text-lg font-medium">Recent Orders</h3>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <Table columns={["Order", "Customer", "Total", "Status"]}>
                {processedRecentOrders.map((o) => (
                  <tr
                    key={String(o._id || o.id || o.displayOrderNumber)}
                    className="hover:bg-lime-100/40 transition"
                  >
                    <td className="px-4 py-2 font-medium">{o.displayOrderNumber}</td>
                    <td className="px-4 py-2">
                      <TrimCell text={o.user?.name || o.customer || '-'} maxWidth="220px" />
                    </td>
                    <td className="px-4 py-2">{o.totalPrice != null ? `$${Number(o.totalPrice).toFixed(2)}` : o.total || '-'}</td>
                    <td className="px-4 py-2">{o.status || '-'}</td>
                  </tr>
                ))}
              </Table>
            )}
          </Card>

          <Card>
            <h3 className="mb-3 text-lg font-medium">Recent Users</h3>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <Table columns={["Name", "Email", "Joined"]}>
                {processedRecentUsers.map((u) => (
                  <tr key={String(u._id || u.id)} className="hover:bg-lime-100/40 transition">
                    <td className="px-4 py-2 font-medium">
                      <TrimCell text={u.firstName || '-'} maxWidth="140px" />
                    </td>
                    <td className="px-4 py-2">
                      <TrimCell text={u.shortEmail || u.email || '-'} maxWidth="200px" />
                    </td>
                    <td className="px-4 py-2">{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </Table>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ==========================
// Reusable components
// ==========================
function Card({ children }) {
  return (
    <div className="p-4 border bg-lime-50 border-lime-100 rounded-xl shadow-soft">
      {children}
    </div>
  );
}

function StatCard({ title, value, trend }) {
  return (
    <div className="flex items-center justify-between p-4 border shadow-sm bg-lime-50 border-lime-100 rounded-xl">
      <div>
        <div className="text-sm text-primary">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className="flex items-center gap-1 text-sm text-primary">
        <ArrowUpRight size={14} />
        {trend}
      </div>
    </div>
  );
}

function Table({ columns = [], children }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm table-auto">
        <thead>
          <tr className="text-left text-primary">
            {columns.map((c) => (
              <th key={c} className="px-4 py-2 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
