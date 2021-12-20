const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  sale: { type: Boolean, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  inStock: { type: Number, required: true },
  src: { type: String, required: true },
});

module.exports = mongoose.model('Product', productSchema);
