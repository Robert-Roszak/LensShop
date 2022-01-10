const express = require('express');
const router = express.Router();

const Order = require('../models/order.model');

router.post('/order', async (req,res) => {
  try {
    const { contact, address, payment, shipping, message, email, items, toPay} = req.body;
    const newOrder = new Order({ contact: contact, address: address, payment: payment, shipping: shipping, message: message, email: email, items: items, toPay: toPay});
    await newOrder.save();
    res.json({ orderId: newOrder._id });
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
