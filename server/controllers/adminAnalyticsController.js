const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// Helper to build last N months array
function lastNMonths(n) {
  const months = [];
  const now = new Date();
  now.setDate(1);
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      label: d.toLocaleString('default', { month: 'short' }),
    });
  }
  return months;
}

const getOverview = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403);
    throw new Error('Not authorized as admin');
  }

  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();

  // Sum revenue from paid orders (isPaid true)
  const revenueAgg = await Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  const totalRevenue = (revenueAgg[0] && revenueAgg[0].total) || 0;

  // Latest orders
  const latestOrdersRaw = await Order.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .populate('user', 'name email');

  const latestOrders = latestOrdersRaw.map((o) => ({
    _id: o._id,
    orderNumber: o.orderNumber || o._id,
    user: o.user ? { name: o.user.name, email: o.user.email } : null,
    totalPrice: o.totalPrice,
    status: o.status || (o.isPaid ? 'Paid' : 'Pending'),
    createdAt: o.createdAt,
  }));

  // Recent users
  const recentUsersRaw = await User.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select('name email createdAt');
  const recentUsers = recentUsersRaw.map((u) => ({
    _id: u._id,
    name: u.name,
    email: u.email,
    createdAt: u.createdAt,
  }));

  // Monthly sales (last 12 months) - sum totalPrice of paid orders per month
  const months = lastNMonths(12);
  const start = new Date(months[0].year, months[0].month - 1, 1);
  const salesAgg = await Order.aggregate([
    { $match: { isPaid: true, createdAt: { $gte: start } } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        total: { $sum: '$totalPrice' },
      },
    },
  ]);

  const salesMap = new Map();
  for (const s of salesAgg) {
    salesMap.set(`${s._id.year}-${s._id.month}`, s.total);
  }

  const monthlySales = months.map((m) => ({
    month: `${m.label} ${String(m.year).slice(-2)}`,
    sales: Number((salesMap.get(`${m.year}-${m.month}`) || 0).toFixed(2)),
  }));

  // Monthly user growth - new users per month
  const usersAgg = await User.aggregate([
    { $match: { createdAt: { $gte: start } } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
  ]);
  const usersMap = new Map();
  for (const u of usersAgg) {
    usersMap.set(`${u._id.year}-${u._id.month}`, u.count);
  }
  const monthlyUserGrowth = months.map((m) => ({
    month: `${m.label} ${String(m.year).slice(-2)}`,
    users: usersMap.get(`${m.year}-${m.month}`) || 0,
  }));

  res.json({
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue: Number(totalRevenue.toFixed(2)),
    latestOrders,
    recentUsers,
    monthlySales,
    monthlyUserGrowth,
  });
});

module.exports = { getOverview };
