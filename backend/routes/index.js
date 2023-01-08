import express from 'express';
const routes = express.Router();
import userRoutes from './userRoute/user.route.js';
import productRoutes from './productRoute/product.route.js';
import orderRoutes from './orderRoute/order.route.js';

routes.use('/api/users', userRoutes);
routes.use('/api/products', productRoutes);
routes.use('/api/orders', orderRoutes);

// PayPal Config Route
routes.use('/api/config/paypal', (req,res)=> res.send(process.env.PAYPAL_CLIENT_ID));

export default  routes;