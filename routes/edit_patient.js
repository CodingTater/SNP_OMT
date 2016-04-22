const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Modules = require('../db/modules');


router.get('/', function(req, res, next) {
  if (req.user.admin === true) {
    Modules.patients().where({ id: req.query.patientId}).first().then((record)=> {
      Modules.measures().where({ patient_id: req.query.patientId }).first().then((actions)=> {
      console.log(actions);
      res.render('edit_patient', {patient: record, measure: actions });
      });
    });
  } else {
    res.render('landing', { error: "You need to have admin clearance for this" });
    }
});

router.put('/:id', (req, res, next)=> {
  Modules.patients().update({
    last: req.body.last,
    first: req.body.first,
    gender: req.body.gender,
    age: req.body.age,
    pcp: req.body.pcp,
    enrollment: req.body.enroll,
    disenrollment: req.body.disenroll,
    diabetes: req.body.diabetes,
    osteoporosis: req.body.osteoporosis,
    cancer: req.body.cancer,
    copd: req.body.copd,
    esrd: req.body.esrd,
    heart: req.body.heart,
    fracture: req.body.fracture
  }).where({ id : req.params.id }).then(()=> {
    Modules.measures().update({
      initial_hra: initHRA,
      recent_hra: recentHRA,
      initial_icp: initICP,
      recent_icp: recentICP,
      c01_breast: C01Breast,
      c02_cancer: C02Cancer,
      c03_flu_vac: C03FluVac,
      c12_osteoporosis: C12Osteo,
      c13_betus_eyecare: C13BetusEye,
      c14_betus_kidneycare: C14BetusKidney
    })
  })
});

router.delete('/:id', (req, res, next)=> {
  Modules.patients().delete().where({ id: req.params.id });
});



module.exports = router;
