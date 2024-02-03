const category = require("../models/category")
const asyncHandler = require('express-async-handler');

// Display list of all category in inventory
exports.categoryList = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: category list');
});

// Display detail page for a specific category in inventory
exports.categoryDetail = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: category detail: ' + req.params.id);
});

// Display category create form on GET
exports.categoryCreateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: category create GET');
});

// Handle category create on POST
exports.categoryCreatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: category create POST');
});

// Display category delete form on GET
exports.categoryDeleteGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: category delete GET');
});

// Handle category delete on POST
exports.categoryDeletePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: category delete POST');
});

// Display category update form on GET
exports.categoryUpdateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: category update GET');
});

// Handle category update on POST
exports.categoryUpdatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: category update POST');
});
