const manufacturer = require("../models/manufacturer")
const asyncHandler = require('express-async-handler');

// Display list of all manufacturer in manufacturer
exports.manufacturerList = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: manufacturer list');
});

// Display detail page for a specific manufacturer in manufacturer
exports.manufacturerDetail = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: manufacturer detail: ' + req.params.id);
});

// Display manufacturer create form on GET
exports.manufacturerCreateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: manufacturer create GET');
});

// Handle manufacturer create on POST
exports.manufacturerCreatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: manufacturer create POST');
});

// Display manufacturer delete form on GET
exports.manufacturerDeleteGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: manufacturer delete GET');
});

// Handle manufacturer delete on POST
exports.manufacturerDeletePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: manufacturer delete POST');
});

// Display manufacturer update form on GET
exports.manufacturerUpdateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: manufacturer update GET');
});

// Handle manufacturer update on POST
exports.manufacturerUpdatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: manufacturer update POST');
});
