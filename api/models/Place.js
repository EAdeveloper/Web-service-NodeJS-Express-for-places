
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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


placeSchema.plugin(mongoosePaginate);

// Generate the model
let Place = mongoose.model('Place', placeSchema);

module.exports = Place;
