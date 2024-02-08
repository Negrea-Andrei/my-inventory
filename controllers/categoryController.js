const category = require("../models/category");
const product = require("../models/product");
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.categoryList = asyncHandler(async (req, res, next) => {
  const allCategories = await category.find({}, "name").exec();
  res.render("categoryList", {
    title: "Categories",
    categoryList: allCategories,
  });
});

exports.categoryDetail = asyncHandler(async (req, res) => {
  const [categories, products] = await Promise.all([
    category.findById(req.params.id).exec(),
    product.find({ category: req.params.id }, "name description").exec(),
  ]);
  if (categories === null) {
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

exports.categoryCreateGet = asyncHandler(async (req, res) => {
  res.render("categoryForm", { title: "Create Category" });
});

exports.categoryCreatePost = [
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const categoryCreate = new category({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("categoryForm", {
        title: "Create Category",
        category: categoryCreate,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await category.findOne({ name: req.body.name }).exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await categoryCreate.save();
        res.redirect(categoryCreate.url);
      }
    }
  }),
];

exports.categoryDeleteGet = asyncHandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: category delete GET');
});

exports.categoryDeletePost = asyncHandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: category delete POST');
});

exports.categoryUpdateGet = asyncHandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: category update GET');
});

exports.categoryUpdatePost = asyncHandler(async (req, res) => {
  res.send('NOT IMPLEMENTED: category update POST');
});
