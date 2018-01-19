const mongoose = require('mongoose');



let userSchema = new mongoose.Schema({
	email:{
		type: String,
		unique: true
	},
	name: String,
	admin:{
		type: Boolean,
		default: false
	}
});

const User = mongoose('User', userSchema);

module.exports = User;