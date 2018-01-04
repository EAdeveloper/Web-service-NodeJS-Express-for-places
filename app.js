
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//to read the petitions data that comes in json || urlencoded
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: false}));


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

app.post('/',(req,res)=>{
// use the property body from he object request, it is fill by body-parser
	// res.json(req.body);
	res.json(req.body.nombre);
	// NOTE: res.json(req.body.nombre)
//  Make a petiion POST with this format:
// {
// 	"nombre": "Almanzar"
// }
// It will retur as: 	"Almanzar"
})




// to make all files in 'public' accessible
app.use(express.static('public'));


app.listen(3000,function(){
	console.log("I am ready to get petitions")
})