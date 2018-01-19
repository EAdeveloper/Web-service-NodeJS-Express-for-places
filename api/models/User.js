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


//mongoose-bcrypt adds an encrypt field "password" and a set of methods like
// verify password, encrypt password etc.
userSchema.plugin(mongooseBcrypt);

const User = mongoose.model('User', userSchema);

module.exports = User;