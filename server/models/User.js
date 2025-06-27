const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  cash: { type: Number, default: 1000 },
  xp: { type: Number, default: 0 },
  inventory: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
