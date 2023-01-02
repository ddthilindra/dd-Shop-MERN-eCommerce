import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound,errorHandler } from './middleware/error.middleware.js';

import productRoutes from './routes/product.route.js';

dotenv.config();

connectDB();

const app = express();

// app.use((req,res,next)=>{
//   console.log(req.originalUrl)
//   next() // continue the task. otherwise stopping the request. next move on to the next piece of middleware
// })

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
const PORT = process.env.PORT || 5000;

app.use(notFound)

// Handle the 500 html error with json
app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
