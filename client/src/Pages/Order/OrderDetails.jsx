import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../../lib/api/api";
import ShippingAddress from "../../Components/Common/ShippingAddress";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only call API if id is a valid 24-char hex string (MongoDB ObjectId)
    if (!id || !/^([a-fA-F0-9]{24})$/.test(id)) {
      setError("Order ID is missing or invalid.");
      setLoading(false);
      return;
    }
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await getOrderById(id);
        if (!mounted) return;
        setOrder(res.data?.data);
      } catch (err) {
        setError(err.response?.data || err.message || "Failed to load order");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="p-8">Loading order...</div>;
  if (error)
    return (
      <div className="p-8">
        <h2 className="mb-4 text-xl font-bold">Order not found</h2>
        <p className="mb-4 text-sm text-red-600">
          {typeof error === "object" && error.message
            ? error.message
            : String(error)}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded bg-primary text-white"
        >
          Back to Home
        </button>
      </div>
    );

  if (!order || !order._id) {
    return (
      <div className="p-8">
        <h2 className="mb-4 text-xl font-bold">Order not found</h2>
        <p className="mb-4 text-sm text-red-600">
          Order data is missing or invalid.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded bg-primary text-white"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Order #{order._id}</h1>
      <p className="mb-2">
        Status: {order.status || (order.isPaid ? "Paid" : "Pending")}
      </p>
      <p className="mb-2">
        Total: ${order.totalPrice?.toFixed?.(2) ?? order.totalPrice}
      </p>

      <h3 className="mt-6 mb-2 text-lg font-semibold">Items</h3>
      <ul className="space-y-3">
        {order.orderItems?.map((it) => (
          <li key={String(it.product)} className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
              {it.image ? (
                <img
                  src={it.image}
                  alt={it.name}
                  className="w-full h-full object-cover"
                  onError={() =>
                    console.warn(`Failed to load image: ${it.image}`)
                  }
                />
              ) : (
                <div className="text-xs text-gray-400">No image</div>
              )}
            </div>
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-gray-600">Qty: {it.qty}</div>
            </div>
            <div className="ml-auto font-semibold">
              ${(it.price * it.qty).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>

      <h3 className="mt-6 mb-2 text-lg font-semibold">Shipping Address</h3>
      <ShippingAddress address={order.shippingAddress} title={null} />
    </div>
  );
}
