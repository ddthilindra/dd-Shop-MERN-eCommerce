import asyncHandler from 'express-async-handler'; // Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
import Order from '../models/order.model.js';

// @desc     Create new order
// @route    POST /api/orders
// @access   Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder=await order.save()

    res.status(201).json(createdOrder)
  }
});

// @desc     Get order by ID
// @route    GET /api/orders/:id
// @access   Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order=await Order.findById(req.params.id).populate('user','name email') // get user details and associate with order

  if(order){
    res.json(order)
  }else{
    res.status(404)
    throw new Error('Order not found..!')
  }
});
