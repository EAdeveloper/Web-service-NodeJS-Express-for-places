const express = require('express');
const router = express.Router();

const usersController = require('../controllers/UsersController');
const sessionsController = require('../controllers/SessionsController');

router.route('/')
	.post(
		usersController.create, 
		sessionsController.generateToken,
		sessionsController.sendToken
		)

	// WARNING
	// When do get, this route will destroy all users
	// .get(usersController.destroyAll);





module.exports = router;
