const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const mods = require('../db/modules');


router.get('/', function(req, res, next) {
  if (req.user.admin === true) {
    const people = mods.patients().where({ id: req.query.patientId }).first();
    const actions = mods.measures().where({ patient_id: req.query.patientId }).first();
      Promise.all([people, actions]).then((both)=> {
        console.log(both[1]);
        res.render('edit_patient', {patient: both[0], measure: both[1] });
      });
  } else {
    res.render('landing', { error: "You need to have admin clearance for this" });
    }
  });

router.put('/:id', (req, res, next)=> {
  const people = mods.patients().update({
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
  }).where({ id : req.params.id });
  const actions = mods.measures().update({
      initial_hra: req.body.initHRA,
      recent_hra: req.body.recentHRA,
      initial_icp: req.body.initICP,
      recent_icp: req.body.recentICP,
      c01_breast: req.body.C01Breast,
      c02_cancer: req.body.C02Cancer,
      c03_flu_vac: req.body.C03FluVac,
      c12_osteoporosis: req.body.C12Osteo,
      c13_betus_eyecare: req.body.C13BetusEye,
      c14_betus_kidneycare: req.body.C14BetusKidney
    }).where({ paitent_id: req.parems.id });
  Promise.all([people, actions]).then(() => {
    res.redirect('landing', { patient: both[0], measure: both[1] });
  });
});

router.delete('/:id', (req, res, next) => {
  const people = mods.patients().delete().where({ id: req.params.id });
  const actions = mods.measures().delete().where({ patient_id: req.params.id})
  Promise.all([people, actions]).then(()=> {
    res.redirect('landing');
  });
});



module.exports = router;
