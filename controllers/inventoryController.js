const inventory = require("../models/inventory");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
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
