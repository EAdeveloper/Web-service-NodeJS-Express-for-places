const User = require('../models/User');

// const helpers = require('./helpers');
const buildParams = require('./helpers').buildParams;

const validParams = ['email', 'name', 'password'];


function create(req,res){
	let params = buildParams(validParams, req.body);

	User.create(params)
		.then(user=>{
			console.log(user);
			res.json(user);
		}).catch(err=>{
			console.log(err);
			res.status(422).json({
				error: err
			})
		})
		// same as above but using the shortkey properties the ecmascript6 for 'error' in this case
		// .catch(error=>{
		// 	console.log(error);
		// 	res.status(422).json({
		// 		error
		// 	})
		// })

}




module.exports = { create }