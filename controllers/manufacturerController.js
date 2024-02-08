const manufacturer = require("../models/manufacturer")
const product = require('../models/product');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

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
      title: manufacturerInfo.name,
      manufacturerInfo,
      productList: products,
    });
  } catch (err) {
    // Handle other errors
    next(err);
  }
});

exports.manufacturerCreateGet = asyncHandler(async (req, res) => {
  res.render("manufacturerForm", { title: "Create Manufacturer" });
});

exports.manufacturerCreatePost = [
  body("name", "Manufacturer name must contain at least 3 characters").trim().isLength({ min: 3 }),
  body("description", "Description must contain at least 3 characters").trim().isLength({ min: 3 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const manufacturerCreate = new manufacturer({
      name: req.body.name,
      description: req.body.description,
    });

    if (!errors.isEmpty()) {
      res.render("manufacturerForm", {
        title: "Create Manufacturer",
        manufacturer: manufacturerCreate,
        errors: errors.array(),
      });
      return;
    } else {
      const manufacturerExists = await manufacturer.findOne({
        name: req.body.name,
        description: req.body.description,
      }).exec();

      if (manufacturerExists) {
        res.redirect(manufacturerExists.url);
      } else {
        await manufacturerCreate.save();
        res.redirect(manufacturerCreate.url);
      }
    }
  }),
];

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
