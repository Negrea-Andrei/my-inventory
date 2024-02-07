const manufacturer = require("../models/manufacturer")
const product = require('../models/product');
const asyncHandler = require('express-async-handler');

// Display list of all manufacturer in manufacturer
exports.manufacturerList = asyncHandler(async (req, res, next) => {
  const allManufacturers = await manufacturer.find({}, "name").exec();

  res.render("manufacturerList", {
    title: "Manufacturers",
    manufacturerList: allManufacturers,
  });
});

exports.manufacturerDetail = asyncHandler(async (req, res, next) => {
  try {
    const [manufacturerInfo, products] = await Promise.all([
      manufacturer.findById(req.params.id),
      product.find({ manufacturer: req.params.id }, 'name description'),
    ]);

    if (!manufacturerInfo) {
      const err = new Error('Manufacturer not found');
      err.status = 404;
      return next(err);
    }

    res.render('manufacturerDetails', {
      title: 'Manufacturer Detail',
      manufacturerInfo,
      productList: products,
    });
  } catch (err) {
    // Handle other errors
    next(err);
  }
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
