const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  buyPrice: Number,
  sellPrice: Number,
  unlockLevel: Number,
});

module.exports = mongoose.model('Item', itemSchema);
