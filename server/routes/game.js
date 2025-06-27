const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Item = require('../models/Item');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.userId).populate('inventory.itemId');
  res.json({
    username: user.username,
    cash: user.cash,
    xp: user.xp,
    level: Math.floor(user.xp / 100) + 1,
    inventory: user.inventory,
  });
});

router.get('/items', auth, async (req, res) => {
  const user = await User.findById(req.userId);
  const level = Math.floor(user.xp / 100) + 1;
  const items = await Item.find({ unlockLevel: { $lte: level } });
  res.json(items);
});

router.post('/buy', auth, async (req, res) => {
  const { itemId } = req.body;
  const user = await User.findById(req.userId);
  const item = await Item.findById(itemId);
  if (user.cash < item.buyPrice)
    return res.status(400).json({ msg: 'Not enough cash' });

  user.cash -= item.buyPrice;
  const invItem = user.inventory.find((i) => i.itemId.equals(itemId));
  if (invItem) invItem.quantity++;
  else user.inventory.push({ itemId, quantity: 1 });

  await user.save();
  res.json({ msg: 'Item bought' });
});

router.post('/sell', auth, async (req, res) => {
  const { itemId } = req.body;
  const user = await User.findById(req.userId);
  const item = await Item.findById(itemId);

  const invItem = user.inventory.find((i) => i.itemId.equals(itemId));
  if (!invItem || invItem.quantity === 0)
    return res.status(400).json({ msg: 'Item not in inventory' });

  invItem.quantity--;
  user.cash += item.sellPrice;
  user.xp += Math.floor(item.sellPrice * 0.1);
  user.inventory = user.inventory.filter((i) => i.quantity > 0);

  await user.save();
  res.json({ msg: 'Item sold' });
});

module.exports = router;
