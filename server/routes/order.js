const router = require("express").Router();
const verifyTokenAndAuth = require("../middleware/verifyTokenAndAuth");
const { createOrder } = require("../controllers/orderControllers");

router.post("/create-order", verifyTokenAndAuth, createOrder);

module.exports = router;
