const Location = require("../models/location");
const Product = require("../models/product");
const Manufacturer = require("../models/manufacturer");

// Importing the express-async-handler middleware to handle asynchronous errors
const asyncHandler = require("express-async-handler");

// Controller for rendering the index page
exports.index = asyncHandler(async (req, res, next) => {
  // Getting counts of documents in each model asynchronously
  const [numLocation, numProduct, numManufacturer] = await Promise.all([
    Location.countDocuments({}).exec(),
    Product.countDocuments({}).exec(),
    Manufacturer.countDocuments({}).exec(),
  ]);

  // Rendering the index page with counts of documents
  res.render("index", {
    title: "Inventory",
    product_number: numProduct,
    manufacturer_number: numManufacturer,
    location_number: numLocation,
  });
});
