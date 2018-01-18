const express = require('express');

const placesController = require('../controllers/PlacesController');

let router = express.Router();

router.route('/')
  .get(placesController.index)
  .post(placesController.multerMiddleware(), placesController.create)

// Show only one place. Wildcards :id
router.route('/:id')
  .get(placesController.find, placesController.show)
  .put(placesController.find, placesController.update)
  .delete(placesController.find, placesController.destroy)
  // placesController.find is the middleware created in the controllers


  module.exports= router;