const location = require("../models/location")
const product = require("../models/product")
const inventory = require("../models/inventory")
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");
require('dotenv').config();

exports.locationList = asyncHandler(async (req, res, next) => {
  const allLocations = await location.find({}, "name address").exec();

  res.render("locationList", {
    title: "Locations",
    locationList: allLocations,
  });
});

exports.locationDetail = asyncHandler(async (req, res, next) => {
  const locationDetails = await location.findById(req.params.id)
    .exec();

  if (!locationDetails) {
    const err = new Error('Location not found');
    err.status = 404;
    return next(err);
  }

  const productsInLocation = await product.find({ location: req.params.id })
    .exec();

  res.render('locationDetails', {
    title: locationDetails.name,
    address: locationDetails.address,
    locationInfo: locationDetails,
    products: productsInLocation,
  });
});

exports.locationCreateGet = asyncHandler(async (req, res) => {
  res.render('locationForm', { title: 'Create Location' });
});

exports.locationCreatePost = [
  body('name', 'Location name is required').trim().notEmpty(),
  body('address', 'Address is required').trim().notEmpty(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const password = req.body.password;

    if (!password || password !== process.env.PASSWORD) {
      res.render('locationForm', {
        title: 'Create Location',
        location: req.body,
        errors: [{ msg: 'Incorrect password. Location creation requires admin access.' }],
      });
      return;
    }

    const locationCreate = new location({
      name: req.body.name,
      address: req.body.address,
    });

    if (!errors.isEmpty()) {
      res.render('locationForm', {
        title: 'Create Location',
        location: locationCreate,
        errors: errors.array(),
      });
      return;
    } else {
      const locationExists = await location.findOne({
        name: req.body.name,
        address: req.body.address,
      }).exec();

      if (locationExists) {
        res.redirect(locationExists.url);
      } else {
        await locationCreate.save();
        res.redirect('/store/locations');
      }
    }
  }),
];

exports.locationDeleteGet = asyncHandler(async (req, res) => {
  const locationId = req.params.id;

  try {
    const locationInfo = await location.findById(locationId);

    if (!locationInfo) {
      res.status(404).send('Location not found');
      return;
    }

    const products = await product.find({ location: locationId });

    res.render('locationDelete', { title: 'Delete Location', locationInfo, products });
  } catch (error) {
    console.error('Error fetching location for delete:', error);
    res.status(500).send('Internal Server Error');
  }
});

exports.locationDeletePost = asyncHandler(async (req, res) => {
  const locationId = req.params.id;

  try {
    const locationInfo = await location.findById(locationId);

    if (!locationInfo) {
      res.status(404).send('Location not found');
      return;
    }

    const productsAtLocation = await product.find({ location: locationId });

    if (productsAtLocation.length > 0) {
      res.render('locationDelete', {
        title: 'Delete Location',
        locationInfo,
        products: productsAtLocation,
        message: 'Cannot delete. Products associated with this location. Delete or update products first.',
      });
      return;
    }

    await location.findOneAndDelete({ _id: locationId });

    res.render('locationDelete', {
      title: 'Location Deleted',
      message: 'Location successfully deleted.',
    });
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).send('Internal Server Error');
  }
});

exports.locationUpdateGet = asyncHandler(async (req, res) => {
  try {
    const locationDetails = await location.findById(req.params.id).exec();

    if (!locationDetails) {
      const err = new Error('Location not found');
      err.status = 404;
      return next(err);
    }

    res.render('locationForm', {
      title: `Update ${locationDetails.name}`,
      location: locationDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

exports.locationUpdatePost = [
  body('name', 'Location name is required').trim().notEmpty(),
  body('address', 'Address is required').trim().notEmpty(),
  body('password', 'Admin password is required').trim().notEmpty(),

  asyncHandler(async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const password = req.body.password;
      if (!password || password !== process.env.PASSWORD) {
        res.render('locationForm', {
          title: `Update Location: ${req.body.name}`,
          location: req.body,
          errors: [{ msg: 'Incorrect password. Location update requires admin access.' }],
        });
        return;
      }

      const updatedLocation = await location.findOneAndUpdate(
        { _id: req.params.id },
        {
          name: req.body.name,
          address: req.body.address,
        },
        { new: true, upsert: false }
      );

      res.redirect(`/store/location/${updatedLocation._id}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }),
];
