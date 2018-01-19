const User = require('../models/User');

// const helpers = require('./helpers');
const buildParams = require('./helpers').buildParams;

const validParams = ['email', 'name', 'password'];


function create(req,res,next){
	let params = buildParams(validParams, req.body);

	User.create(params)
		.then(user=>{
			// res.json(user);
			req.user = user;
			next();
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


// WARNING
// This is the most dangerous funtion for the route
// function destroyAll(req, res){
// 	User.remove({}).then(r => res.json({}));
// }
// module.exports = { create, destroyAll }



module.exports = { create}
