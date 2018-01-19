// Here is the logic to generate the tokens
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');


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
	generateToken,
	sendToken
}