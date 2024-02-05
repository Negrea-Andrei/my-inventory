const location = require("../models/location")
const asyncHandler = require('express-async-handler');

// Display list of all locations in inventory
exports.locationList = asyncHandler(async (req, res, next) => {
  const allLocations = await location.find({}, "name address").exec();

  res.render("locationList", {
    title: "Locations",
    locationList: allLocations,
  });
});


// Display detail page for a specific location in inventory
exports.locationDetail = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: Location detail: ' + req.params.id);
});

// Display location create form on GET
exports.locationCreateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: Location create GET');
});

// Handle location create on POST
exports.locationCreatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: Location create POST');
});

// Display location delete form on GET
exports.locationDeleteGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: Location delete GET');
});

// Handle location delete on POST
exports.locationDeletePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: Location delete POST');
});

// Display location update form on GET
exports.locationUpdateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: Location update GET');
});

// Handle location update on POST
exports.locationUpdatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: Location update POST');
});
