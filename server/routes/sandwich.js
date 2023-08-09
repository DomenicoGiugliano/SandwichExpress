const router = require("express").Router();
const {
  getSandwich,
  filterSandwiches,
  createSandwich,
  updateSandwich,
  deleteSandwich,
} = require("../controllers/sandwichControllers");
const verifyTokenAndAuth = require("../middleware/verifyTokenAndAuth");
const verifyAdmin = require("../middleware/verifyAdmin");

router.get("/", filterSandwiches);
router.get("/:id", getSandwich);
router.post("/", verifyTokenAndAuth, verifyAdmin, createSandwich);
router.put("/:id", verifyTokenAndAuth, verifyAdmin, updateSandwich);
router.delete("/:id", verifyTokenAndAuth, verifyAdmin, deleteSandwich);

module.exports = router;
