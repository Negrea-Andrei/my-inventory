const product = require("../models/product")
const manufacturer = require('../models/manufacturer');
const category = require('../models/category');
const location = require('../models/location');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { body, validationResult } = require("express-validator");
const asyncHandler = require('express-async-handler');

// Display list of all product in product
exports.productList = asyncHandler(async (req, res) => {
  const allProducts = await product.find({}, "name manufacturer quantity")
  .sort({ name: 1 })
  .populate("manufacturer")
  .exec();

  res.render("productList", { title: "Products", productList: allProducts }); 
});

// Display detail page for a specific product in product
exports.productDetail = asyncHandler(async (req, res, next) => {
  const productDetails = await product
    .findById(req.params.id)
    .populate("manufacturer")
    .populate("category")
    .populate("location")
    .exec();

  if (!productDetails) {
    // No results.
    const err = new Error("Product not found");
    err.status = 404;
    return next(err);
  }

  res.render("productDetails", {
    title: productDetails.name,
    manufacturer: productDetails.manufacturer,
    category: productDetails.category,
    description: productDetails.description,
    location: productDetails.location,
    product: productDetails,
  });
});

exports.productCreateGet = asyncHandler(async (req, res) => {
  const manufacturers = await manufacturer.find();
  const categories = await category.find();
  const locations = await location.find();

  res.render("productForm", {
      title: "Create Product",
      manufacturers,
      categories,
      locations,
  });
});

exports.productCreatePost = [
  body("name", "Product name is required").trim().notEmpty(),
  body("description", "Product description is required").trim().notEmpty(),
  body("price", "Invalid price").isFloat({ min: 0, max: 4000 }),
  body("manufacturer", "Invalid manufacturer").isMongoId(),
  body("quantity", "Invalid quantity").isInt({ min: 0, max: 4000 }),
  body("category.*", "Invalid category").isMongoId(),
  body("location", "Invalid location").isMongoId(),

  upload.single('img'),

  asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);

      const productCreate = new product({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          manufacturer: req.body.manufacturer,
          quantity: req.body.quantity,
          category: req.body.category,
          location: req.body.location,
          img: req.file ? req.file.buffer : null,
      });

      console.log("1")

      if (!errors) {
          const manufacturers = await manufacturer.find();
          const categories = await category.find();
          const locations = await location.find();

          res.render("productForm", {
              title: "Create Product",
              manufacturers,
              categories,
              locations,
              errors: errors.array(),
          });
          return;
      } else {
        console.log("2")
          const existingProduct = await product.findOne({
              name: req.body.name,
              description: req.body.description,
              price: req.body.price,
              manufacturer: req.body.manufacturer,
              quantity: req.body.quantity,
              category: req.body.category,
              location: req.body.location,
              img: req.file ? req.file.buffer : null,
          }).exec();

          if (existingProduct) {
            console.log("3")
              res.redirect(existingProduct.url);
          } else {
            console.log("4")
              await productCreate.save();
              res.redirect(productCreate.url);
          }
      }
  }),
];

// Display product delete form on GET
exports.productDeleteGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: product delete GET');
});

// Handle product delete on POST
exports.productDeletePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: product delete POST');
});

// Display product update form on GET
exports.productUpdateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: product update GET');
});

// Handle product update on POST
exports.productUpdatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: product update POST');
});
