const producer = require("../models/producer")
const asyncHandler = require('express-async-handler');

// Display list of all producer in producer
exports.producerList = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: producer list');
});

// Display detail page for a specific producer in producer
exports.producerDetail = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: producer detail: ' + req.params.id);
});

// Display producer create form on GET
exports.producerCreateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: producer create GET');
});

// Handle producer create on POST
exports.producerCreatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: producer create POST');
});

// Display producer delete form on GET
exports.producerDeleteGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: producer delete GET');
});

// Handle producer delete on POST
exports.producerDeletePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: producer delete POST');
});

// Display producer update form on GET
exports.producerUpdateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: producer update GET');
});

// Handle producer update on POST
exports.producerUpdatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: producer update POST');
});
