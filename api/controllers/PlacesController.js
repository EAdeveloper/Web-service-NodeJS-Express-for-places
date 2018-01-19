const Place = require('../models/Place');

const upload = require('../config/upload');


// Middleware
// When pass 'next' we tell express to execute the funtion in the middleware
function find(req, res, next){
	Place.findOne({slug:req.params.id})
	.then(place=>{
		req.place = place;
		next();
	}).catch(err=>{
		next(err);
	})
}


function index(req, res){
	  // Show all places
	// Place.find({}).then(doc=>{
	Place.paginate({},{ page: req.query.page || 1, limit: 4, sort: {'_id': -1}  })
		.then(doc=>{
    	res.json(doc);
      }).catch(err=>{
        console.log(err);
        res.json(err);
    });

}

function create(req, res, next){
	// create new places
	console.log(req.body);
	Place.create({
    title:             req.body.title,
    description:       req.body.description,
    acceptsCreditCard: req.body.acceptsCreditCard,
    openHour:          req.body.openHour,
    closeHour:         req.body.closeHour
    // title: "Menteware Office",
    // description: "Best software company",
    // acceptsCreditCard: true,
    // openHour: 0,
    // closeHour: 24
  }).then(doc=>{
      // res.json(doc)
      req.place = doc;
      next();
    }).catch(err=>{
      // console.log(err);
      // res.json(err);
      next(err);
    });

}

function show(req, res){
	// Individual search
	// res.place is where we save the search result in the MiddleWare
	res.json(req.place);
}


function update(req, res){
	// Place.findById(req.params.id)
    //   .then(doc=>{
    //     doc.title =              req.body.title;
    //     doc.description =        req.body.description;
    //     doc.acceptsCreditCard =  req.body.acceptsCreditCard;
    //     doc.openHour =           req.body.openHour;
    //     doc.closeHour =          req.body.closeHour;
    //     doc.save();
    //   })
    let attributes = ['title','description', 'acceptsCreditCard',
                    'openHour', 'closeHour'];
    let placeParams = {}
    
    attributes.forEach(attr=>{
      if(Object.prototype.hasOwnProperty.call(req.body, attr))
        placeParams[attr] = req.body[attr];
    });             
   
    // req.place = Object.assign(req.place, req.body); THIS is not a secure way because can change the fields like permision to Admin for example

    req.place = Object.assign(req.place, placeParams);

    req.place.save().then(doc=>{
        res.json(doc);
      }).catch(err=>{
        console.log(err);
        res.json(err);
      });
	
}

function destroy(req, res){
	req.place.remove().then(doc=>{
      res.json({});
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
	
}


function multerMiddleware(){
	// fields is an controler for archives in the web
	//fields is method to create a collectin of names for the files we are expected to get
	//In case it only gets ONE files you can use 'single' instead 'fields'
	return upload.fields([
		{name: 'avatar', maxCount: 1}, 
		{name: 'cover', maxCount: 1}
	]);
}

function saveImageToCloud(req, res){
	if(req.place){
		// Siclo para las imgs
		const archivos = ['avatar', 'cover'];
		const promesas = [];
		
		archivos.forEach(imageType=>{

			if(req.files && req.files[imageType]){
				const path = req.files[imageType][0].path;
				promesas.push(req.place.updateImage(path, imageType));
			}	
		})

		Promise.all(promesas).then(results=>{
			console.log(results);
			res.json(req.place);
		}).catch(err=>{
			console.log(err);
			res.json(err);
		});	

	}else{
		res.status(422).json({
			error: req.error || "Could not save place"
		});
	}
}

module.exports = {
	index, show, create, destroy, update, find, multerMiddleware, 
	saveImageToCloud
};







// module.exports = {
// 	index: index,
// 	create: create,
// 	show: show,
// 	update: update,
// 	destroy: destroy
// }

// Same code above uisng the shortkey properties from ecmascript 6

