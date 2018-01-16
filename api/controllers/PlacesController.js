const Place = require('../models/Place');

function index(req, res){
	  // Show all places
	// Place.find({}).then(doc=>{
	Place.paginate({},{ page: req.query.page || 1, limit: 1, sort: {'_id': -1}  })
		.then(doc=>{
    	res.json(doc);
      }).catch(err=>{
        console.log(err);
        res.json(err);
    });

}

function create(req, res){
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
      res.json(doc)
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });

}

// Show only one place. Wildcards :id
function show(req, res){
	// res.json(req.params.id);
  // Place.findOne({})
    Place.findById(req.params.id).then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
	
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
    // Place.update({'_id': req.params.id},placeParams).then(doc=>{
    // Place.findOneAndUpdate({'_id': req.params.id},placeParams,{new: true})
    Place.findByIdAndUpdate(req.params.id, placeParams,{new: true})
      .then(doc=>{
        res.json(doc);
      }).catch(err=>{
        console.log(err);
        res.json(err);
      });
	
}

function destroy(req, res){
	Place.findByIdAndRemove(req.params.id).then(doc=>{
      res.json({});
    }).catch(err=>{
      console.log(err);
      res.json(err);
    });
	
}

// module.exports = {
// 	index: index,
// 	create: create,
// 	show: show,
// 	update: update,
// 	destroy: destroy
// }

// Same code above uisng the shortkey properties from ecmascript 6
module.exports = {index, show, create, destroy, update};
