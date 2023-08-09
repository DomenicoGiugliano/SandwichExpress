const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sandwiches: [
    {
      sandwich: { type: mongoose.Schema.Types.ObjectId, ref: "Sandwich" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
