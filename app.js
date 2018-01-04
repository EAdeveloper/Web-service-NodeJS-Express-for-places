
const express = require('express');

const app = express();


// Mocking JSON
const places = [
	{
		'title': 'Office Menteware',
		'description': 'Best the best best ',
		'address': '133 West 521 ST, NY'
	},
	{
		'title': 'Office Menteware',
		'description': 'Best the best best ',
		'address': '133 West 521 ST, NY'
	},
	{
		'title': 'Office Menteware',
		'description': 'Best the best best ',
		'address': '133 West 521 ST, NY'
	}
]

app.get('/',(req, res)=>{
	// res.json({'nombre': 'Edward'})
	res.json(places);

});



// to make all files in 'public' accessible
app.use(express.static('public'));


app.listen(3000,function(){
	console.log("I am ready to get petitions")
})