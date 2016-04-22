const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const mods = require('../db/modules');


router.get('/', function(req, res, next) {
  if (req.user.admin === true) {
    const people = mods.patients().where({ id: req.query.patientId }).first();
    const actions = mods.measures().where({ patient_id: req.query.patientId }).first();
      Promise.all([people, actions]).then((both)=> {
        console.log(both[0]);
        res.render('edit_patient', {patient: both[0], measure: both[1] });
      });
  } else {
    res.render('landing', { error: "You need to have admin clearance for this" });
    }
  });

router.put('/:id', (req, res, next)=> {
  const denroll = {
    last: req.body.last,
    first: req.body.first,
    gender: req.body.gender,
    age: req.body.age,
    pcp: req.body.pcp,
    diabetes: req.body.diabetes,
    osteoporosis: req.body.osteoporosis,
    cancer: req.body.cancer,
    copd: req.body.copd,
    esrd: req.body.esrd,
    heart: req.body.heart,
    fracture: req.body.fracture
  };
    if (req.body.disenroll) {
      denroll.disenrollment = req.body.disenroll;
      }
    if (req.body.enroll) {
      denroll.enroll = req.body.enroll;
    }
  const enroll = mods.patients().update(denroll).where({ id: req.params.id });
  var newData = { patient_id: req.params.id };
  if (req.body.initHRA) {
    newData.initial_hra = req.body.initHRA;
  }
  if (req.body.recentHRA) {
    newData.recent_hra = req.body.recentHRA;
  }
  if (req.body.recentHRA) {
    newData.initial_icp = req.body.initICP;
  }
  if (req.body.recentHRA) {
    newData.recent_icp = req.body.recentICP;
  }
  if (req.body.recentHRA) {
    newData.c01_breast = req.body.C01Breast;
  }
  if (req.body.recentHRA) {
    newData.c02_cancer = req.body.C02Cancer;
  }
  if (req.body.recentHRA) {
    newData.c03_flu_vac = req.body.C03FluVac;
  }
  if (req.body.recentHRA) {
    newData.c12_osteoporosis = req.body.C12Osteo;
  }
  if (req.body.recentHRA) {
    newData.c13_betus_eyecare = req.body.C13BetusEye;
  }
  if (req.body.recentHRA) {
    newData.c14_betus_kidneycare = req.body.C14BetusKidney;
  }

  const actions = mods.measures().update(newData).where({ patient_id: req.params.id });
  Promise.all([actions, enroll]).then(() => {
    res.redirect('/landing');
  }).catch(err => {
    console.log('KYLE: ' + req.params.id, patient_id);
    // console.log(err);
  });
});

router.delete('/:id', (req, res, next) => {
  const people = mods.patients().delete().where({ id: req.params.id });
  const actions = mods.measures().delete().where({ patient_id: req.params.id})
  Promise.all([people, actions]).then(()=> {
    res.redirect('/landing');
  });
});



module.exports = router;
