const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Modules = require('../db/modules');

router.get('/', function(req, res, next) {
  if (req.user.admin === true) {
    res.render('add_patient');
  } else {
    res.render('landing', { error: "You need to have admin clearance for this" });
    }
});

router.get('add_patient', (req, res, next)=> {
  Modules.patients().where({ id : req.params.id });
  res.render('add_patient');
});

router.post('/add_patient', (req, res, next)=> {
  Modules.patients().insert({ last: req.body.last, first: req.body.first, gender: req.body.gender, age: req.body.age, pcp: req.body.pcp, enrollment: req.body.enroll, disenrollment: req.body.disenroll, diabetes: req.body.diabetes, osteoporosis: req.body.osteoporosis, cancer: req.body.cancer, copd: req.body.copd, esrd: req.body.esrd, heart: req.body.heart, fracture: req.body.fracture });
});




router.delete('/add_patient/:id', (req, res, next)=> {
  Modules.patients().delete().where({ id: req.params.id });
});

module.exports = router;
