const category = require("../models/category")
const product = require("../models/product")
const asyncHandler = require('express-async-handler');

// Display list of all category in inventory
exports.categoryList = asyncHandler(async (req, res, next) => {
  const allCategories = await category.find({}, "name").exec();

  res.render("categoryList", {
    title: "Categories",
    categoryList: allCategories,
  });
});


// Display detail page for a specific category in inventory
exports.categoryDetail = asyncHandler(async (req, res) => {
  const [categories, products] = await Promise.all([
    category.findById(req.params.id).exec(),
    product.find({ category: req.params.id }, "name description").exec(),
  ]);
  if (categories === null) {
    // No results.
    const err = new Error("Category not found");
    err.status = 404;
    return next(err);
  }

  res.render("categoryDetails", {
    title: "Category",
    category: categories,
    productList: products,
  });
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
