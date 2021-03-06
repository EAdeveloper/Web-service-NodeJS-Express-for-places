const buildParams = require('./helpers').buildParams;
const validParams = ['_place'];

const FavoritePlace = require('../models/FavoritePlace');
const User = require("../models/User");	


function find(req, res, next){
	FavoritePlace.findById(req.params.id).then(fav=>{
		req.mainObj = fav; //we saved in the here to use it to protect the Owner route
		req.favorite = fav; //we saved in this property to use it to delete it
		next();
	}).catch(next);
}

// Show all favrites places
function index(req, res){
	// req.user
	User.findOne( {'_id': req.user.id }).then(user=>{
			user.favoritesVirtual.then(lugares=>{
				res.json(lugares);
			})
		}).catch(err=>{
			console.log(err);
			res.json(err);
		})
}


function create(req, res){
	let params = buildParams(validParams, req.body);
	params['_user'] = req.user.id;

	FavoritePlace.create(params)
		.then(favorite=>{
			res.json(favorite);
		}).catch(error=>{
			res.status(422).json(error);
		})
}


function destroy(req, res){
	req.favorite.remove().then(doc=>{
		res.json({})
	}).catch(error=>{
		res.status(500).json(error);
	})
}


module.exports = {find, create, destroy, index};