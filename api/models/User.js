const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');

const Place = require('./Place');
const FavoritePlace = require("./FavoritePlace");


let userSchema = new mongoose.Schema({
	email:{
		type: String,
		require: true,
		unique: true
	},
	name: String,
	admin:{
		type: Boolean,
		default: false
	}
});


 // post is a hooks from Mongoose
userSchema.post('save', function(user, next){
	User.count({}).then(count=>{
		if(count == 1){
			// user.admin = true;
			// user.save().then(next);
			User.update({'_id':user._id},{admin:true})
				.then(result=>{
					next();
				})
		}else{
			next();
		}
	})
})


// Mongoose supports virtual attributes.
// a 'virtual' is an virtual attribute of a document, it can be use get data or to send data 'get' or 'post'
// get all places created by a User example; edward.places
userSchema.virtual('myPlacesVirtual').get(function(){
	return Place.find({'_user': this._id})
})

// Virtual to get the Favorites Places of a User
userSchema.virtual("favoritesVirtual").get(function(){
	return FavoritePlace.find({'_user': this.id}, {'_place': true})
		.then(favs=>{
			// Array to get all ids for the places
			let placeIds = favs.map(fav => fav._place);

			// SELECT IN query
			// Find all places for the ids in the Array
			return Place.find( {'_id': {$in: placeIds}} )
		})
})



//mongoose-bcrypt adds an encrypt field "password" and a set of methods like
// verify password, encrypt password etc.
userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;