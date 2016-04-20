var express = require('express');
var router = express.Router();

const knex = require('../db/knex.js');
const Modules = require('../db/modules.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/landing', (req, res, next)=> {
  res.render('landing', { company: "SNP" })
});

router.get('/login', (req, res, next)=> {
  res.render('login');
});

router.get('/patientData', (req, res, next)=> {
  res.render('patientData');
});
router.get('/reports', (req, res, next)=> {
  res.render('reports');
});

module.exports = router;

// select measures.initial_hra::date - patients.enrollment::date from measures join patients on patients.id = measures.patient_id;
//
// return knex.raw(select measures.initial_hra::date - patients.enrollment::date).from('measures').
