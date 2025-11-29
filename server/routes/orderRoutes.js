const express = require('express');
const router = express.Router();
const { 
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
  adminDeleteOrder
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');


// User order creation and viewing
router.route('/myorders').get(protect, getMyOrders);
router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

// Admin CRUD routes
router.route('/')
  .get(protect, admin, getOrders)
  .post(protect, admin, createOrder);

router.route('/:id')
  .get(protect, admin, getOrder)
  .put(protect, admin, updateOrder)
  .delete(protect, admin, deleteOrder);

// Admin update and delete orders
router.put('/admin/:orderId', protect, adminUpdateOrder);
router.delete('/admin/:orderId', protect, adminDeleteOrder);

module.exports = router;
