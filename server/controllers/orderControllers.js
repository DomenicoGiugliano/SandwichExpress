const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createOrder = asyncHandler(async (req, res) => {
  const { userId, sandwiches, total, paymentIntentId, shippingInfo } = req.body;

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.status !== "succeeded") {
    res.status(400).json({ message: "Payment failed" });
    return;
  }

  const order = new Order({
    userId,
    sandwiches,
    total,
    shippingInfo,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

module.exports = { createOrder };
