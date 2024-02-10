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

exports.manufacturerDeleteGet = asyncHandler(async (req, res) => {
  try {
    const manufacturerId = req.params.id;

    const [manufacturerToDelete, productList] = await Promise.all([
      manufacturer.findById(manufacturerId).exec(),
      product.find({ manufacturer: manufacturerId }, 'name').exec(),
    ]);

    if (!manufacturerToDelete) {
      res.status(404).send('Manufacturer not found');
      return;
    }

    res.render('manufacturerDelete', {
      title: 'Delete Manufacturer',
      manufacturer: manufacturerToDelete,
      productList: productList || [],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

exports.manufacturerDeletePost = asyncHandler(async (req, res) => {
  try {
    const manufacturerId = req.params.id;

    const [manufacturerToDelete, productList] = await Promise.all([
      manufacturer.findById(manufacturerId).exec(),
      product.find({ manufacturer: manufacturerId }, 'name').exec(),
    ]);

    if (!manufacturerToDelete) {
      res.status(404).send('Manufacturer not found');
      return;
    }

    if (productList.length > 0) {
      res.render('manufacturerDelete', {
        title: 'Delete Manufacturer',
        manufacturer: manufacturerToDelete,
        productList: productList,
        message: 'Cannot delete. Products associated with this Manufacturer.',
      });
      return;
    }

    // Delete the manufacturer if no associated products
    await manufacturer.deleteOne({ _id: manufacturerId });
    res.redirect('/store/manufacturers');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
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
