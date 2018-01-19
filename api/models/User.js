const mongoose = require('mongoose');
const mongooseBcrypt = require('mongoose-bcrypt');



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


//mongoose-bcrypt adds an encrypt field "password" and a set of methods like
// verify password, encrypt password etc.
userSchema.plugin(mongooseBcrypt);

const User = mongoose('User', userSchema);

module.exports = User;