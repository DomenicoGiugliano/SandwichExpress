const Sandwich = require("../models/Sandwich");
const asyncHandler = require("express-async-handler");

const getSandwich = asyncHandler(async (req, res) => {
  const sandwich = await Sandwich.findById(req.params.id);
  if (sandwich) {
    res.json(sandwich);
  } else {
    res.status(404).json({ message: "Sandwich not found" });
  }
});

const createSandwich = asyncHandler(async (req, res) => {
  const { name, description, price, img, categories } = req.body;

  if (!name || !description || !price || !img || !categories) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Sandwich.findOne({ name });

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "A sandwich with this name already exists" });
  }

  const sandwich = new Sandwich({
    name,
    description,
    price,
    img,
    categories,
  });

  const createdSandwich = await sandwich.save();
  res.status(201).json(createdSandwich);
});

const updateSandwich = asyncHandler(async (req, res) => {
  const { name, description, price, img, categories } = req.body;

  if (!name || !description || !price || !img || !categories) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Sandwich.findOne({ name });

  if (duplicate && String(duplicate._id) !== req.params.id) {
    return res
      .status(409)
      .json({ message: `A sandwich with the name:${name} already exists` });
  }

  const sandwich = await Sandwich.findById(req.params.id);

  if (sandwich) {
    sandwich.name = name;
    sandwich.description = description;
    sandwich.price = price;
    sandwich.img = img;
    sandwich.categories = categories;

    const updatedSandwich = await sandwich.save();
    res.json(updatedSandwich);
  } else {
    res.status(404);
    throw new Error("Sandwich not found");
  }
});

const deleteSandwich = asyncHandler(async (req, res) => {
  const sandwich = await Sandwich.findByIdAndDelete(req.params.id);

  if (sandwich) {
    res.json({ message: "Sandwich removed" });
  } else {
    res.status(404);
    throw new Error("Sandwich not found");
  }
});

const filterSandwiches = asyncHandler(async (req, res) => {
  const { name, maxPrice, category } = req.query;

  let filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (maxPrice && !isNaN(maxPrice)) {
    filter.price = { $lte: parseFloat(maxPrice) };
  } else if (maxPrice) {
    return res.status(400).json({ message: "Invalid max price value" });
  }

  if (category) {
    filter.categories = category;
  }

  const sandwiches = await Sandwich.find(filter);
  res.json(sandwiches);
});

module.exports = {
  getSandwich,
  createSandwich,
  updateSandwich,
  deleteSandwich,
  filterSandwiches,
};
