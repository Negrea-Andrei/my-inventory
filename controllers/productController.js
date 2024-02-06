const product = require("../models/product")
const asyncHandler = require('express-async-handler');

// Display list of all product in product
exports.productList = asyncHandler(async (req, res) => {
  const allProducts = await product.find({}, "name manufacturer")
  .sort({ name: 1 })
  .populate("manufacturer")
  .exec();

  res.render("productList", { title: "Products", productList: allProducts }); 
});

// Display detail page for a specific product in product
exports.productDetail = asyncHandler(async (req, res, next) => {
  const productList = await Promise.all([
    product.findById(req.params.id).populate("manufacturer").populate("category").populate("location").exec(),
  ]);

  if (productList[0] === null) {
    // No results.
    const err = new Error("Product not found");
    err.status = 404;
    return next(err);
  }

  res.render("productDetails", {
    title: productList[0].name,
    manufacturer: productList[0].manufacturer,
    category: productList[0].category,
    description: productList[0].description,
    location: productList[0].location,
    product: productList[0],
  });
});

// Display product create form on GET
exports.productCreateGet = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: product create GET');
});

// Handle product create on POST
exports.productCreatePost = asyncHandler(async (req, res) => {
  // Your implementation here
  res.send('NOT IMPLEMENTED: product create POST');
});

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
