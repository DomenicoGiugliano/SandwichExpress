const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");

const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userid: req.user.id }).populate(
    "sandwiches.sandwich"
  );

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  return res.json(cart);
});

const addToCart = asyncHandler(async (req, res) => {
  const { sandwich, quantity, price } = req.body;

  let cart = await Cart.findOne({ userid: req.user.id });

  if (!cart) {
    cart = new Cart({ userid: req.user.id, sandwiches: [] });
  }

  cart.sandwiches.push({ sandwich, quantity, price });

  await cart.save();

  return res.status(201).json(cart);
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { sandwich, quantity, price } = req.body;

  let cart = await Cart.findOne({ userid: req.user.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const itemIndex = cart.sandwiches.findIndex(
    (item) => item.sandwich.toString() === sandwich
  );

  if (itemIndex > -1) {
    const item = cart.sandwiches[itemIndex];
    item.quantity = quantity;
    item.price = price;
  } else {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  await cart.save();

  return res.json(cart);
});

const removeCartItem = asyncHandler(async (req, res) => {
  const { sandwich } = req.body;

  let cart = await Cart.findOne({ userid: req.user.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const itemIndex = cart.sandwiches.findIndex(
    (item) => item.sandwich.toString() === sandwich
  );

  if (itemIndex > -1) {
    cart.sandwiches.splice(itemIndex, 1);
  } else {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  await cart.save();

  return res.json(cart);
});

const clearCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ userid: req.user.id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.sandwiches = [];

  await cart.save();
  return res.json(cart);
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};
