const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

const validateId = (id) => String(id).match(/^[a-fA-F0-9]{24}$/);

const getOrders = asyncHandler(async (req, res) => {
  // Populate user name for admin orders list
  const orders = await Order.find().populate('user', 'name');
  res.json({ status: 'success', data: orders });
});

const getOrder = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid order ID');
  }
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json({ status: 'success', data: order });
});

const createOrder = asyncHandler(async (req, res) => {
  const Product = require('../models/productModel');
  const rawItems = req.body.orderItems || req.body.items || [];
  for (const itemRaw of rawItems) {
    const productId = itemRaw.product || itemRaw.productId || itemRaw.id;
    const prod = await Product.findById(productId);
    if (!prod) {
      res.status(404);
      throw new Error('Product not found');
    }
  }
  const order = await Order.create(req.body);
  // Respond immediately to the client
  res.status(201).json({ status: 'success', data: order });

  // Best-effort: clear the user's DB cart after successful order creation.
  // Fire-and-forget, do not block response or rollback the created order on failure.
  try {
    Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], totalPrice: 0 }
    ).catch((err) => {
      console.error('Failed to clear DB cart after createOrder for user', req.user && req.user._id, err);
    });
  } catch (err) {
    console.error('Unexpected error while attempting to clear DB cart after createOrder:', err);
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid order ID');
  }
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json({ status: 'success', data: order });
});

const deleteOrder = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid order ID');
  }
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json({ status: 'success', data: order });
});
// Remove duplicate asyncHandler and Order declarations
const addOrderItems = asyncHandler(async (req, res) => {
  // Defensive: accept multiple shapes from frontend (orderItems OR items),
  // and support both `qty` and `quantity` fields for compatibility.
  const { shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } =
    req.body;

  const rawItems = req.body.orderItems || req.body.items || [];

  // Helpful debug log for cases where clients send unexpected payloads
  if (process.env.NODE_ENV === 'development') {
    try {
      console.log('addOrderItems received body:', JSON.stringify(req.body));
    } catch (e) {
      console.log('addOrderItems received body (non-serializable)');
    }
  }

  if (!rawItems || rawItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const Product = require('../models/productModel');
  const populatedItems = [];
  for (const itemRaw of rawItems) {
    const productId = itemRaw.product || itemRaw.productId || itemRaw.id;
    const qty = itemRaw.qty || itemRaw.quantity || itemRaw.qty || 1;
    const prod = await Product.findById(productId);
    if (!prod) {
      res.status(404);
      throw new Error('Product not found');
    }

    // Prefer the first product image URL if available (product stores `images` array)
    let imgUrl = '';
    if (prod.images && Array.isArray(prod.images) && prod.images.length > 0) {
      const firstImage = prod.images[0];
      // Handle both {url, publicId} objects and plain string URLs
      imgUrl = typeof firstImage === 'string' ? firstImage : firstImage.url || '';
    } else if (prod.image) {
      imgUrl = prod.image;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `Order item ${prod.name}: images=${prod.images?.length || 0}, extracted imgUrl=${imgUrl}`,
      );
    }

    populatedItems.push({
      name: prod.name,
      qty,
      image: imgUrl,
      price: prod.price,
      product: prod._id,
    });
  }

  const normalizedPaymentMethod = paymentMethod
    ? String(paymentMethod).toLowerCase()
    : paymentMethod;

  const order = new Order({
    orderItems: populatedItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod: normalizedPaymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  // Respond immediately to the client
  res.status(201).json({ status: 'success', data: createdOrder });

  // Best-effort: clear the user's DB cart after successful order save.
  // Non-blocking: do not await or rollback on failure — just log errors.
  try {
    Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], totalPrice: 0 }
    ).catch((err) => {
      console.error('Failed to clear DB cart after addOrderItems for user', req.user && req.user._id, err);
    });
  } catch (err) {
    console.error('Unexpected error while attempting to clear DB cart after addOrderItems:', err);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (order) {
    // Allow owner or admin to view
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Not authorized to view this order');
    }
    res.json({ status: 'success', data: order });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json({ status: 'success', data: orders });
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const adminUpdateOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status, trackingNumber } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  if (status) order.status = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;

  await order.save();

  res.status(200).json({ message: 'Order updated successfully', order });
});

const adminDeleteOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  await order.remove();

  res.status(200).json({ message: 'Order deleted successfully' });
});

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  adminUpdateOrder,
  adminDeleteOrder,
};
