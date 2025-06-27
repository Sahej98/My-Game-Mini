require('dotenv').config();
const express = require('express'), mongoose = require('mongoose'), cors = require('cors');
const authRouter = require('./routes/authRoute'),
 userRouter = require('./routes/userRoute');
const buildingsRouter = require('./routes/buildingRoute');

const app = express();
app.use(cors(), express.json());
app.use('/api/auth', authRouter);
app.use('/api/buildings', buildingsRouter);
app.use('/api', userRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`)))
  .catch(err => console.error('DB connection', err));
