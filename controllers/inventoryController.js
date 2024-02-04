const Location = require("../models/location");
const Product = require("../models/product");
const Producer = require("../models/producer");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  const [
    numLocation,
    numProduct,
    numProducer
  ] = await Promise.all([
    Location.countDocuments({}).exec(),
    Product.countDocuments({}).exec(),
    Producer.countDocuments({}).exec(),
  ]);

  res.render("index", {
    title: "Store",
    product_number: numProduct,
    producer_number: numProducer,
    location_number: numLocation,
  }
  )
});

exports.inventoryList = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory list");
});

exports.inventoryDetail = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory detail: " + req.params.id);
});

exports.inventoryCreateGet = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory create GET");
});

exports.inventoryCreatePost = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory create POST");
});

exports.inventoryDeleteGet = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory delete GET");
});

exports.inventoryDeletePost = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory delete POST");
});

exports.inventoryUpdateGet = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory update GET");
});

exports.inventoryUpdatePost = asyncHandler(async (req, res) => {
  res.send("NOT IMPLEMENTED: inventory update POST");
});
