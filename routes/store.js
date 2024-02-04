const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/categoryController");
const inventory_controller = require("../controllers/inventoryController");
const location_controller = require("../controllers/locationController");
const manufacturer_controller = require("../controllers/manufacturerController");
const product_controller = require("../controllers/productController");

//!  Inventory

router.get("/", inventory_controller.index);

router.get("/inventory/create", inventory_controller.inventoryCreateGet);

router.post("/inventory/create", inventory_controller.inventoryCreatePost);

router.get("/inventory/:id/delete", inventory_controller.inventoryDeleteGet);

router.post("/inventory/:id/delete", inventory_controller.inventoryDeletePost);

router.get("/inventory/:id/update", inventory_controller.inventoryUpdateGet);

router.post("/inventory/:id/update", inventory_controller.inventoryUpdatePost);

router.get("/inventory/:id", inventory_controller.inventoryDetail);

router.get("/inventories", inventory_controller.inventoryList);

//! Category

router.get("/category/create", category_controller.categoryCreateGet);

router.post("/category/create", category_controller.categoryCreatePost);

router.get("/category/:id/delete", category_controller.categoryDeleteGet);

router.post("/category/:id/delete", category_controller.categoryDeletePost);

router.get("/category/:id/update", category_controller.categoryUpdateGet);

router.post("/category/:id/update", category_controller.categoryUpdatePost);

router.get("/category/:id", category_controller.categoryDetail);

router.get("/categories", category_controller.categoryList);

//! Location

router.get("/location/create", location_controller.locationCreateGet);

router.post("/location/create", location_controller.locationCreatePost);

router.get("/location/:id/delete", location_controller.locationDeleteGet);

router.post("/location/:id/delete", location_controller.locationDeletePost);

router.get("/location/:id/update", location_controller.locationUpdateGet);

router.post("/location/:id/update", location_controller.locationUpdatePost);

router.get("/location/:id", location_controller.locationDetail);

router.get("/locations", location_controller.locationList);

//! Manufacturer

router.get("/manufacturer/create", manufacturer_controller.manufacturerCreateGet);

router.post("/manufacturer/create", manufacturer_controller.manufacturerCreatePost);

router.get("/manufacturer/:id/delete", manufacturer_controller.manufacturerDeleteGet);

router.post("/manufacturer/:id/delete", manufacturer_controller.manufacturerDeletePost);

router.get("/manufacturer/:id/update", manufacturer_controller.manufacturerUpdateGet);

router.post("/manufacturer/:id/update", manufacturer_controller.manufacturerUpdatePost);

router.get("/manufacturer/:id", manufacturer_controller.manufacturerDetail);

router.get("/manufacturers", manufacturer_controller.manufacturerList);

//! Product

router.get("/product/create", product_controller.productCreateGet);

router.post("/product/create", product_controller.productCreatePost);

router.get("/product/:id/delete", product_controller.productDeleteGet);

router.post("/product/:id/delete", product_controller.productDeletePost);

router.get("/product/:id/update", product_controller.productUpdateGet);

router.post("/product/:id/update", product_controller.productUpdatePost);

router.get("/product/:id", product_controller.productDetail);

router.get("/products", product_controller.productList);

module.exports = router;