
import React, { useEffect, useState } from "react";
import { Search, Filter, Eye } from "lucide-react";
import axiosInstance from "../../lib/axiosInstance";

const statusStyles = {
  Delivered: "bg-lightGreen/20 text-lightGreen",
  Pending: "bg-primary/20 text-primary",
  Cancelled: "bg-primary/20 text-primary",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axiosInstance.get("/api/orders");
        setOrders(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      await axiosInstance.delete(`/api/orders/admin/${orderId}`);
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
      alert("Order deleted successfully");
    } catch (err) {
      alert("Failed to delete order: " + err.message);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen p-5 bg-transparent">
      {/* Page Title */}
      <h1 className="mb-6 text-3xl font-bold text-primary">Orders</h1>

      {/* Orders Table for large screens */}
      <div className="hidden overflow-hidden shadow-lg md:block rounded-xl bg-primary/10">
        <table className="w-full text-left">
          <thead className="bg-primary/20 text-primary">
            <tr>
              <th className="p-4">Order Number</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order._id || order.id || index}
                className={`border-t border-primary/10 ${
                  index % 2 === 0 ? "bg-white/40" : "bg-white/20"
                }`}
              >
                <td className="p-4 font-semibold text-primary">{order.orderNumber || order._id || '-'}</td>
                <td className="p-4 text-primary">{order.user && order.user.name ? order.user.name : '-'}</td>
                <td className="p-4 text-primary">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</td>
                <td className="p-4 font-semibold text-primary">
                  ${order.totalPrice != null ? order.totalPrice.toFixed(2) : '-'}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status && statusStyles[order.status] ? statusStyles[order.status] : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {order.status && typeof order.status === 'string' && order.status.trim() !== '' ? order.status : '-'}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button className="inline-flex p-2 transition rounded-lg bg-primary/10 hover:bg-primary/20">
                    <Eye size={18} className="text-primary" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders Cards for small screens */}
      <div className="flex flex-col gap-4 md:hidden">
        {orders.map((order, idx) => (
          <div
            key={order._id || order.id || idx}
            className="flex flex-col gap-2 p-4 shadow bg-primary/10 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-primary">{order.orderNumber || order._id || '-'}</span>
              <button className="inline-flex p-2 transition rounded-lg bg-primary/10 hover:bg-primary/20">
                <Eye size={18} className="text-primary" />
              </button>
            </div>
            <div className="text-primary">Customer: {order.user && order.user.name ? order.user.name : '-'}</div>
            <div className="text-primary">Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</div>
            <div className="font-semibold text-primary">
              Total: ${order.totalPrice != null ? order.totalPrice.toFixed(2) : "-"}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status && statusStyles[order.status] ? statusStyles[order.status] : 'bg-gray-200 text-gray-500'
              }`}
            >
              {order.status && typeof order.status === 'string' && order.status.trim() !== '' ? order.status : '-'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
