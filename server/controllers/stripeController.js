const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");

const createPaymentIntent = asyncHandler(async (req, res) => {
  const { total } = req.body;

  if (!total || typeof total !== "number" || total <= 0) {
    return res.status(400).json({ message: "Invalid total amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "usd",
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: "Error creating payment intent", error });
  }
});

module.exports = { createPaymentIntent };
