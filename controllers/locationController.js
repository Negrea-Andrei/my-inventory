const location = require("../models/location")
const inventory = require("../models/inventory")
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

// Display list of all locations in inventory
exports.locationList = asyncHandler(async (req, res, next) => {
  const allLocations = await location.find({}, "name address").exec();

  res.render("locationList", {
    title: "Locations",
    locationList: allLocations,
  });
});

exports.locationCreateGet = asyncHandler(async (req, res) => {
  res.render("locationForm", { title: "Create Location" });
});

exports.locationCreatePost = [
  body("name", "Location name is required").trim().notEmpty(),
  body("address", "Address is required").trim().notEmpty(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const locationCreate = new location({
      name: req.body.name,
      address: req.body.address,
    });

    if (!errors.isEmpty()) {
      res.render("locationForm", {
        title: "Create Location",
        location: locationCreate,
        errors: errors.array(),
      });
      return;
    } else {
      const locationExists = await location.findOne({
        name: req.body.name,
        address: req.body.address,
      }).exec();

      if (locationExists) {
        res.redirect(locationExists.url);
      } else {
        await locationCreate.save();
        res.redirect("/store/locations");
      }
    }
  }),
];
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
