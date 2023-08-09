const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sandwiches: [
    {
      sandwich: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sandwich",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  shippingInfo: {
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    cap: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Order", orderSchema);
