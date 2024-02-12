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

exports.productDeleteGet = asyncHandler(async (req, res) => {
  try {
    const theProduct = await product.findById(req.params.id).exec();

    if (!theProduct) {
      // No results.
      res.redirect("/products");
      return;
    }

    res.render('productDelete', {
      title: 'Delete Product',
      product: theProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Handle product delete on POST
exports.productDeletePost = asyncHandler(async (req, res) => {
  try {
    const theProduct = await product.findById(req.params.id).exec();

    if (!theProduct) {
      // No results.
      res.redirect("/store/products");
      return;
    }

    // Delete the product and redirect to the list of products.
    await product.deleteOne({ _id: req.body.productId })
    res.redirect("/store/products");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// Display product update form on GET
exports.productUpdateGet = asyncHandler(async (req, res, next) => {
  try {
    // Fetch the product details for the given ID
    const productDetails = await product
      .findById(req.params.id)
      .populate("manufacturer")
      .populate("category")
      .populate("location")
      .exec();

    if (!productDetails) {
      // Product not found
      const err = new Error("Product not found");
      err.status = 404;
      return next(err);
    }

    // Fetch manufacturers, categories, and locations for dropdowns
    const manufacturers = await manufacturer.find();
    const categories = await category.find();
    const locations = await location.find();

    // Render the product update form with fetched data
    res.render("productForm", {
      title: `Update ${productDetails.name}`,
      product: productDetails,
      manufacturers,
      categories,
      locations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Handle product update on POST
exports.productUpdatePost = [
  body("name", "Product name is required").trim().notEmpty(),
  body("description", "Product description is required").trim().notEmpty(),
  body("price", "Invalid price").isFloat({ min: 0, max: 4000 }),
  body("manufacturer", "Invalid manufacturer").isMongoId(),
  body("quantity", "Invalid quantity").isInt({ min: 0, max: 4000 }),
  body("category.*", "Invalid category").isMongoId(),
  body("location", "Invalid location").isMongoId(),

  upload.single('img'),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      // Fetch valid categories for dropdown
      const categories = await category.find();

      // Ensure req.body.category is an array
      const selectedCategories = Array.isArray(req.body.category) ? req.body.category : [req.body.category];

      // Check if the selected categories are valid
      const invalidCategories = selectedCategories.filter(
        categoryId => !categories.some(category => category._id.equals(categoryId))
      );

      if (invalidCategories.length > 0) {
        errors.array().push({
          msg: "Invalid category selected",
          param: "category",
          value: invalidCategories,
        });
      }

      if (errors.isEmpty()) {
        // There are validation errors, re-render the form with errors
        const manufacturers = await manufacturer.find();
        const locations = await location.find();

        return res.render("productForm.pug", {
          title: "Update Product",
          product: req.body,
          manufacturers,
          categories,
          locations,
          errors: errors.array(),
        });
      }


      // Find the existing product to get the current image data
      const existingProduct = await product.findById(req.params.id);

      // Update the product with new data, including the new image or the existing image
      const updatedProduct = await product.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          manufacturer: req.body.manufacturer,
          quantity: req.body.quantity,
          category: selectedCategories,
          location: req.body.location,
          img: req.file ? req.file.buffer : (existingProduct ? existingProduct.img : undefined),
        },
        { new: true, upsert: false } // Do not create a new document
      );


      // Redirect to the product detail page after a successful update
      res.redirect(updatedProduct.url);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }),
];