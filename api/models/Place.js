
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uploader = require('./uploader');




// Schema del modelo
let placeSchema = new mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	description: String,
	acceptsCreditCard: {
		type: Boolean,
		default: false
	},
	coverImage: String,
	avatarImage: String,
	openHour: Number,
	closeHour: Number

});

placeSchema.methods.updateImage = function(path, imgType){
	// Here we have to do 2 things, 
	// First is to upload the image and second is to save the 'place'
	return uploader(path)
		.then(secure_url => this.saveImageUrl(secure_url, imgType))
}

placeSchema.methods.saveImageUrl = function(secureUrl, imgType){
	// this.avatarImage = secureUrl;
	this[imgType+ 'Image'] = secureUrl;
	return this.save();
}


placeSchema.plugin(mongoosePaginate);

// Generate the model
let Place = mongoose.model('Place', placeSchema);

module.exports = Place;
