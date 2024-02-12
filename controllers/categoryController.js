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
  try {
    const [theCategory, associatedProducts] = await Promise.all([
      category.findById(req.params.id).exec(),
      product.find({ category: req.params.id }, 'name description').exec(),
    ]);

    if (!theCategory) {
      res.status(404).send('Category not found');
      return;
    }

    if (associatedProducts.length > 0) {
      res.render('categoryDelete', {
        title: 'Delete Category',
        category: theCategory,
        productList: associatedProducts || [],
        message: 'Cannot delete category as it is associated with products. Delete the associated products first.',
      });
    } else {
      res.render('categoryDelete', {
        title: 'Delete Category',
        category: theCategory,
        productList: [],
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

exports.categoryDeletePost = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;

    const [categoryToDelete, productList] = await Promise.all([
      category.findById(categoryId).exec(),
      product.find({ category: categoryId }, 'name').exec(),
    ]);

    if (!categoryToDelete) {
      res.status(404).send('Category not found');
      return;
    }

    if (productList.length > 0) {
      res.render('categoryDelete', {
        title: 'Delete Category',
        category: categoryToDelete,
        productList: productList,
        message: 'Cannot delete. Products associated with this Category.',
      });
      return;
    }

    await category.deleteOne({ _id: categoryId });
    res.redirect('/store/categories');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

exports.categoryUpdateGet = asyncHandler(async (req, res) => {
  const categoryId = req.params.id;

  const categoryDetails = await category.findById(categoryId);

  if (!categoryDetails) {
    res.status(404).send('Category not found');
    return;
  }

  res.render('categoryForm', {
    title: `Update Category: ${categoryDetails.name}`,
    category: categoryDetails,
  });
});

exports.categoryUpdatePost = [
  body("name", "Category name must contain at least 3 characters").trim().isLength({ min: 3 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const categoryId = req.params.id;

    if (!errors.isEmpty()) {
      const categoryDetails = await category.findById(categoryId);
      res.render("categoryUpdateForm", {
        title: `Update Category: ${categoryDetails.name}`,
        category: categoryDetails,
        errors: errors.array(),
      });
      return;
    }

    const updatedCategory = await category.findByIdAndUpdate(
      categoryId,
      {
        name: req.body.name,
      },
      { new: true }
    );

    res.redirect(updatedCategory.url);
  }),
];
