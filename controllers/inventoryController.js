// Importing necessary models and modules
const Location = require("../models/location");
const Product = require("../models/product");
const Manufacturer = require("../models/manufacturer");

// Importing the express-async-handler middleware to handle asynchronous errors
const asyncHandler = require("express-async-handler");

// Controller for rendering the index page
exports.index = asyncHandler(async (req, res, next) => {
  // Getting counts of documents in each model asynchronously
  const [
    numLocation,
    numProduct,
    numManufacturer
  ] = await Promise.all([
    Location.countDocuments({}).exec(),
    Product.countDocuments({}).exec(),
    Manufacturer.countDocuments({}).exec(),
  ]);

  // Rendering the index page with counts of documents
  res.render("index", {
    title: "Store",
    product_number: numProduct,
    manufacturer_number: numManufacturer,
    location_number: numLocation,
  });
});

// Placeholder controller for handling the inventory list route
exports.inventoryList = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory list");
});

// Placeholder controller for handling the inventory detail route
exports.inventoryDetail = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory detail: " + req.params.id);
});

// Placeholder controller for handling the inventory create GET route
exports.inventoryCreateGet = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory create GET");
});

// Placeholder controller for handling the inventory create POST route
exports.inventoryCreatePost = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory create POST");
});

// Placeholder controller for handling the inventory delete GET route
exports.inventoryDeleteGet = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory delete GET");
});

// Placeholder controller for handling the inventory delete POST route
exports.inventoryDeletePost = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory delete POST");
});

// Placeholder controller for handling the inventory update GET route
exports.inventoryUpdateGet = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory update GET");
});

// Placeholder controller for handling the inventory update POST route
exports.inventoryUpdatePost = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory update POST");
});
