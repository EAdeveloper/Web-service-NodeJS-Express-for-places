const mongoose = require('mongoose');



let favoriteSchema = new mongoose.Schema({
	_user: {
		type: mongoose.Schema.Type.ObjectId,
		ref: 'User',
		required: true
	},

	_place: {
		type: mongoose.Schema.Type.ObjectId,
		ref: 'Place',
		required: true

	}

})


const FavoritePlace = mongoose.model("FavoritePlace", favoriteSchema);

module.exports = FavoritePlace;