const express = require('express');

const placesController = require('../controllers/PlacesController');

let router = express.Router();

router.route('/')
  .get(placesController.index)
  .post(placesController.create)

// Show only one place. Wildcards :id
router.route('/:id')
  .get(placesController.show)
  .put(placesController.update)
  .delete(placesController.destroy)
  

  module.exports= router;