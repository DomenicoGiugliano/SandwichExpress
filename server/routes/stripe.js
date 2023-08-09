const router = require("express").Router();
const { createPaymentIntent } = require("../controllers/stripeController");
const verifyTokenAndAuth = require("../middleware/verifyTokenAndAuth");

router.post("/payment-intent", verifyTokenAndAuth, createPaymentIntent);

module.exports = router;
