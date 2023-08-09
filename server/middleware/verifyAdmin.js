const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user && user.isAdmin) {
    next();
  } else {
    res.status(403).json({ msg: "Admin authorization required" });
  }
};

module.exports = verifyAdmin;
