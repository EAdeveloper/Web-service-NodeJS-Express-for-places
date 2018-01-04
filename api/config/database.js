const mongoose = require('mongoose');

const dbName = 'places_menteware_api';

module.exports = {
	connect: ()=> mongoose.connect('mongodb://localhost/'+dbName),
	//Shorthand porperties
	// in JS when you have a key with the same name as the var you can just type 1 emp; dbName
	// dbName: dbName,
	dbName,
	connection: ()=>{
		if(mongoose.connection)
			return mongoose.connection;
		return this.connect();
	}
}