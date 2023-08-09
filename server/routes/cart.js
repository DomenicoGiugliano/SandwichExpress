const router = require("express").Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartControllers");
const verifyTokenAndAuth = require("../middleware/verifyTokenAndAuth");

router.get("/", verifyTokenAndAuth, getCart);
router.post("/add", verifyTokenAndAuth, addToCart);
router.put("/update/:sandwichId", verifyTokenAndAuth, updateCartItem);
router.delete("/remove/:sandwichId", verifyTokenAndAuth, removeCartItem);
router.put("/clear", verifyTokenAndAuth, clearCart);

module.exports = router;
