// Here is the logic to generate the tokens
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const User = require('../models/User');

// Authetication to login
function authenticate(req,res,next){
	// find the user send by the client
	User.findOne({email: req.body.email})
		// if the user is found then
		.then(user=>{
			// verifyPassword is a method from mongoose-becrypt to verify it
			user.verifyPassword(req.body.password)
				.then(valid=>{
					if(valid){
						req.user = user;
						next();
					}else{
						next(new Error("Invalid Credentials. No es el password"));
					}
				})
		}).catch(error=> next(error));

}

// Because generateToken goes firts than sendToken, it includes the next middleware
// it means it has find the response in the sendToken middleware 
function generateToken(req,res,next){
	if(!req.user) return next();

	req.token = jwt.sign({id: req.user._id}, secrets.jwtSecret);

	next();
}
function sendToken(req,res){
	if(req.user){
		res.json({
			user: req.user,
			jwt: req.token
		})
	}else{
		res.status(422).json({
			error: "Could not User, no se pudo crear"
		})
	}
	
}


module.exports = {
	authenticate,
	generateToken,
	sendToken
}