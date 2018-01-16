const express = require('express');
const Place = require('../models/Place');

let router = express.Router();

router.route('/')
  .get((req,res)=>{
     // Show all places
    Place.find({})
      .then(doc=>{
        res.json(doc);
      }).catch(err=>{
        console.log(err);
        res.json(err);
      });
  })
  .post((req, res)=>{
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
})

// Show only one place. Wildcards :id
router.route('/:id')
  .get((req,res)=>{
  // res.json(req.params.id);
  // Place.findOne({})
    Place.findById(req.params.id)
      .then(doc=>{
      res.json(doc);
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
  })

  .put((req, res)=>{
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
  })

  .delete((req, res)=>{
    Place.findByIdAndRemove(req.params.id)
    .then(doc=>{
      res.json({});
    }).catch(err=>{
      console.log(err);
      res.json(err);
    })
  });

  module.exports= router;