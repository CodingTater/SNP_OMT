const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Modules = require('../db/modules');

router.get('/', function(req, res, next) {
  if (req.user.admin === true) {
    Modules.patients().where({ id: req.query.patientId}).first().then((record)=> {
      console.log(record);
      res.render('edit_patient', {patient: record});
    });
  } else {
    res.render('landing', { error: "You need to have admin clearance for this" });
    }
});

router.put('/edit_patient/:id', (req, res, next)=> {
  Modules.patients().update({ last: req.body.last, first: req.body.first, gender: req.body.gender, age: req.body.age, pcp: req.body.pcp, enrollment: req.body.enroll, disenrollment: req.body.disenroll, diabetes: req.body.diabetes, osteoporosis: req.body.osteoporosis, cancer: req.body.cancer, copd: req.body.copd, esrd: req.body.esrd, heart: req.body.heart, fracture: req.body.fracture }).where({ id : req.params.id })
});

router.delete('/edit_patient/:id', (req, res, next)=> {
  Modules.patients().delete().where({ id: req.params.id });
});



module.exports = router;
