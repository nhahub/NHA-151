"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Calendar, Clock, Info, X } from "lucide-react";
import { getMyOrders } from "@/lib/api/api";

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "text-green-600 bg-green-100";
    case "Paid":
      return "text-amber-600 bg-amber-100";
    case "Processing":
      return "text-gray-600 bg-gray-100";
    default:
      return "text-secondary bg-gray-50";
  }
};

const OrdersTable = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getMyOrders();
        if (!mounted) return;
        // Fix: orders array is in res.data.data
        setOrders(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err.message ||
          "Failed to load orders";
        setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchOrders();
    return () => {
      mounted = false;
    };
  }, []);

  const handleViewOrder = (order) => {
    const firstItem = order.orderItems?.[0] || {};
    setSelectedOrder({
      id: order._id,
      product: firstItem.name || `Order ${order._id}`,
      thumbnail: firstItem.image || "/placeholder.jpg",
      quantity: order.orderItems?.reduce(
        (sum, item) => sum + (item.qty || 0),
        0
      ),
      price: order.totalPrice ?? 0,
      status: order.isDelivered
        ? "Delivered"
        : order.isPaid
        ? "Paid"
        : "Processing",
      date: order.createdAt
        ? new Date(order.createdAt).toLocaleDateString()
        : "",
      details: order.orderItems
        ?.map((it) => `${it.name} x${it.qty}`)
        .join(", "),
    });
  };

  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <h3 className="flex items-center gap-2 mb-4 text-lg font-semibold text-primary">
        <ShoppingBag size={20} /> Order History
      </h3>

      {/* Desktop Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b text-secondary">
              <th className="p-3">Order ID</th>
              <th className="p-3">Product</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price (EGP)</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-6 text-sm text-center text-secondary/70"
                >
                  Loading orders...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-6 text-sm text-center text-red-600"
                >
                  {error}
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="p-6 text-sm text-center text-secondary/70"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order, index) => {
                const firstItem = order.orderItems?.[0] || {};
                const thumb = firstItem.image || "/placeholder.jpg";
                const title = firstItem.name || `Order ${order._id}`;
                const qty =
                  order.orderItems?.reduce((s, it) => s + (it.qty || 0), 0) ||
                  0;
                const price = order.totalPrice ?? 0;
                const date = order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "";
                const statusLabel = order.isDelivered
                  ? "Delivered"
                  : order.isPaid
                  ? "Paid"
                  : "Processing";

                return (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">{order._id}</td>
                    <td className="flex items-center gap-2 p-3">
                      <img
                        src={thumb}
                        alt={title}
                        className="object-cover w-10 h-10 rounded-lg"
                      />
                      {title}
                    </td>
                    <td className="p-3">{qty}</td>
                    <td className="p-3">{price}</td>
                    <td className="flex items-center gap-1 p-3 text-sm text-secondary">
                      <Calendar size={14} /> {date}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          statusLabel
                        )}`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="flex items-center gap-1 text-primary hover:text-primary/80"
                      >
                        <Info size={16} /> View
                      </button>
                    </td>
                  </motion.tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {loading ? (
          <div className="p-4 text-sm text-center text-secondary/70">
            Loading orders...
          </div>
        ) : error ? (
          <div className="p-4 text-sm text-center text-red-600">{error}</div>
        ) : orders.length === 0 ? (
          <div className="p-4 text-sm text-center text-secondary/70">
            No orders found.
          </div>
        ) : (
          orders.map((order, index) => {
            const firstItem = order.orderItems?.[0] || {};
            const thumb = firstItem.image || "/placeholder.jpg";
            const title = firstItem.name || `Order ${order._id}`;
            const qty =
              order.orderItems?.reduce((s, it) => s + (it.qty || 0), 0) || 0;
            const price = order.totalPrice ?? 0;
            const date = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString()
              : "";
            const statusLabel = order.isDelivered
              ? "Delivered"
              : order.isPaid
              ? "Paid"
              : "Processing";

            return (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className="flex flex-col p-4 border shadow-sm rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={thumb}
                    alt={title}
                    className="object-cover w-14 h-14 rounded-xl"
                  />
                  <div>
                    <h4 className="font-semibold text-primary">{title}</h4>
                    <p className="flex items-center gap-1 text-sm text-secondary">
                      <Clock size={14} /> {date}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                        statusLabel
                      )}`}
                    >
                      {statusLabel}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="font-medium">{price} EGP</p>
                    <p className="text-xs text-secondary">x{qty}</p>
                  </div>
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    <Info size={14} /> View
                  </button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md p-6 bg-white shadow-xl rounded-2xl"
            >
              <button
                onClick={() => setSelectedOrder(null)}
                className="absolute text-gray-500 top-4 right-4 hover:text-primary"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedOrder.thumbnail}
                  alt={selectedOrder.product}
                  className="object-cover w-20 h-20 rounded-xl"
                />
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    {selectedOrder.product}
                  </h3>
                  <p className="flex items-center gap-1 text-sm text-secondary">
                    <Calendar size={14} /> {selectedOrder.date}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Order ID:</strong> {selectedOrder.id}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedOrder.quantity}
                </p>
                <p>
                  <strong>Total:</strong> {selectedOrder.price} EGP
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status}
                  </span>
                </p>
                <p className="pt-2 text-secondary">{selectedOrder.details}</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedOrder(null)}
                className="w-full px-4 py-2 mt-6 font-medium text-white rounded-xl bg-primary hover:bg-primary/90"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrdersTable;
