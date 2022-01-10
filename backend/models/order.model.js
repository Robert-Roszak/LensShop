const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  contact: { type: String, required: true },
  address: { type: String, required: true },
  payment: { type: String, required: true },
  shipping: { type: String, required: true },
  message: { type: String, required: false },
  email: { type: String, required: true },
  toPay: { type: Number, required: true },
  items: { type: Array, required: true },
});

module.exports = mongoose.model('Order', orderSchema);
