const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const User = require('../models/userModel');

const validateId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ status: 'success', data: users });
});

exports.getUser = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid user ID');
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ status: 'success', data: user });
});

exports.createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ status: 'success', data: user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid user ID');
  }
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ status: 'success', data: user });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  if (!validateId(req.params.id)) {
    res.status(400);
    throw new Error('Invalid user ID');
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ status: 'success', data: user });
});
