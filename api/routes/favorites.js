const express = require('express');
let router = express.Router();

const authenticateOwner = require('../middlewares/authenticateOwner');
const favoritesController = require('../controllers/FavoritesController');


const jwtMiddleware = require('express-jwt');
const secrets = require("../config/secrets");



router.route('/')
	// In app.js we exclude all the GET request from the JWT protection but
	// Here we need this routes to be protected to get the User's favorite, 
	// meaning user must be registered.
	.get(jwtMiddleware({secret: secrets.jwtSecret}), 
		favoritesController.index )

	.post(favoritesController.create);

router.route('/:id')
	.delete(
		favoritesController.find,
		authenticateOwner,
		favoritesController.destroy
		);



module.exports = router;