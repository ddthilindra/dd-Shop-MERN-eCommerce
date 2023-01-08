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

// @desc     Update order to paid
// @route    PUT /api/orders/:id/pay
// @access   Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order=await Order.findById(req.params.id)

  if(order){
    // set the properties
    order.isPaid=true
    order.paidAt=Data.now()
    // comming from paypal
    order.paymentResult={
      id:req.body.id,
      status:req.body.status,
      update_time:req.body.update_time,
      email_address:req.body.email_address,
    }

    const updatedOrder=await order.save()

    res.json(updatedOrder)
  }else{
    res.status(404)
    throw new Error('Order not found..!')
  }
});