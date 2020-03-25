var express = require('express');
var router = express.Router();
let Bisection = require('../models/bisection');
let Flaseposition = require('../models/flaseposition');
let Onepointiteration = require('../models/onepointiteration');
let Newtonraphson = require('../models/newtonraphson');
let Secant = require('../models/secant');
let Cramerrule = require('../models/cramerrule');
let Jacobiiteration = require('../models/jacobiiteration');
let Linearregression = require('../models/linearregression');
let Polynomialregression = require('../models/polynomialregression');
let Lagrange = require('../models/lagrange');
let Spline = require('../models/spline');
let Compositetrapezoidalrule = require('../models/compositetrapezoidalrule');
let Compositesimpsonrule = require('../models/compositesimpsonrule');
let Newtondividedifference = require('../models/newtondividedifference');
let Forward = require('../models/forward');

router.get('/showBisection', function(req, res, next) {
 
  Bisection.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showFlaseposition', function(req, res, next) {
 
  Flaseposition.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showOnepointiteration', function(req, res, next) {
 
  Onepointiteration.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showNewtonraphson', function(req, res, next) {
 
  Newtonraphson.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showSecant', function(req, res, next) {
 
  Secant.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showCramerrule', function(req, res, next) {
 
  Cramerrule.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showJacobiiteration', function(req, res, next) {
 
  Jacobiiteration.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showLinearregression', function(req, res, next) {
 
  Linearregression.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showPolynomialregression', function(req, res, next) {
 
  Polynomialregression.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showLagrange', function(req, res, next) {
 
  Lagrange.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showSpline', function(req, res, next) {
 
  Spline.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showCompositetrapezoidalrule', function(req, res, next) {
 
  Compositetrapezoidalrule.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showCompositesimpsonrule', function(req, res, next) {
 
  Compositesimpsonrule.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showNewtondividedifference', function(req, res, next) {
 
  Newtondividedifference.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.get('/showForward', function(req, res, next) {
 
  Forward.find().sort({age:1}).exec((err,data)=>{
    console.log(data);
    return res.json({success:true,data:data});
  })
});

router.post('/addBisection',(req,res)=>{
  console.log(req.body);
  let doc = new Bisection(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addFlaseposition',(req,res)=>{
  console.log(req.body);
  let doc = new Flaseposition(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addOnepointiteration',(req,res)=>{
  console.log(req.body);
  let doc = new Onepointiteration(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addNewtonraphson',(req,res)=>{
  console.log(req.body);
  let doc = new Newtonraphson(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addSecant',(req,res)=>{
  console.log(req.body);
  let doc = new Secant(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addCramerrule',(req,res)=>{
  console.log(req.body);
  let doc = new Cramerrule(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addJacobiiteration',(req,res)=>{
  console.log(req.body);
  let doc = new Jacobiiteration(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addLinearregression',(req,res)=>{
  console.log(req.body);
  let doc = new Linearregression(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addPolynomialregression',(req,res)=>{
  console.log(req.body);
  let doc = new Polynomialregression(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addLagrange',(req,res)=>{
  console.log(req.body);
  let doc = new Lagrange(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addSpline',(req,res)=>{
  console.log(req.body);
  let doc = new Spline(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addCompositetrapezoidalrule',(req,res)=>{
  console.log(req.body);
  let doc = new Compositetrapezoidalrule(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addCompositesimpsonrule',(req,res)=>{
  console.log(req.body);
  let doc = new Compositesimpsonrule(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addNewtondividedifference',(req,res)=>{
  console.log(req.body);
  let doc = new Newtondividedifference(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/addForward',(req,res)=>{
  console.log(req.body);
  let doc = new Forward(req.body);
  doc.save((err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

router.post('/deleteUser',(req,res)=>{
  console.log(req.params);
  User.findByIdAndRemove(req.params._id,(err,data)=>{
    if(err) throw err;
    res.send({success:true});
  })
})

module.exports = router;
