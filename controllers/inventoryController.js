const inventory = require("../models/inventory")
const asyncHandler = require('express-async-handler');

// Display list of all inventory in inventory
exports.inventoryList = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: inventory list');
});

// Display detail page for a specific inventory in inventory
exports.inventoryDetail = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: inventory detail: ' + req.params.id);
});

// Display inventory create form on GET
exports.inventoryCreateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: inventory create GET');
});

// Handle inventory create on POST
exports.inventoryCreatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: inventory create POST');
});

// Display inventory delete form on GET
exports.inventoryDeleteGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: inventory delete GET');
});

// Handle inventory delete on POST
exports.inventoryDeletePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: inventory delete POST');
});

// Display inventory update form on GET
exports.inventoryUpdateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: inventory update GET');
});

// Handle inventory update on POST
exports.inventoryUpdatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: inventory update POST');
});
