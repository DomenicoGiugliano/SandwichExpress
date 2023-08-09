const router = require("express").Router();
const {
  login,
  register,
  changePassword,
} = require("../controllers/authControllers");
const verifyTokenAndAuth = require("../middleware/verifyTokenAndAuth");

router.post("/login", login);
router.post("/register", register);
router.put("/change-password", verifyTokenAndAuth, changePassword);

module.exports = router;
