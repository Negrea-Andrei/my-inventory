const Location = require("../models/location");
const Product = require("../models/product");
const Manufacturer = require("../models/manufacturer");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [numLocation, numProduct, numManufacturer] = await Promise.all([
    Location.countDocuments({}).exec(),
    Product.countDocuments({}).exec(),
    Manufacturer.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Store",
    product_number: numProduct,
    manufacturer_number: numManufacturer,
    location_number: numLocation,
  });
});
