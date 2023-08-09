require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/auth");
const sandwichRoutes = require("./routes/sandwich");
const cartRoutes = require("./routes/cart");
const stripeRoutes = require("./routes/stripe");
const orderRoutes = require("./routes/order");
const PORT = process.env.PORT || 3500;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/sandwich", sandwichRoutes);
app.use("/cart", cartRoutes);
app.use("/stripe", stripeRoutes);
app.use("/order", orderRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
