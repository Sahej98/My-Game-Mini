const mongoose = require('mongoose');
const Item = require('./models/Item');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Item.deleteMany();
  await Item.insertMany([
    { name: 'Apple', buyPrice: 100, sellPrice: 150, unlockLevel: 1 },
    { name: 'Banana', buyPrice: 200, sellPrice: 300, unlockLevel: 2 },
    { name: 'Car', buyPrice: 500, sellPrice: 800, unlockLevel: 3 },
  ]);
  console.log('Items seeded');
  process.exit();
});
