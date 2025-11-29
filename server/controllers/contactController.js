const asyncHandler = require('express-async-handler');
const ContactMessage = require('../models/contactMessageModel');

const createMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('name, email, subject and message are required');
  }

  const payload = {
    name,
    email,
    subject,
    message,
  };

  if (req.user && req.user._id) payload.user = req.user._id;

  const created = await ContactMessage.create(payload);

  res.status(201).json(created);
});

const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().populate('user', 'name email').sort('-createdAt');
  res.json(messages);
});

const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const msg = await ContactMessage.findById(id);
  if (!msg) {
    res.status(404);
    throw new Error('Message not found');
  }
  msg.isRead = true;
  await msg.save();
  res.json(msg);
});

module.exports = { createMessage, getAllMessages, markAsRead };
