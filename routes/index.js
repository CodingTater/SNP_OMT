var express = require('express');
var router = express.Router();
const knex = require('../db/knex.js');
const Modules = require('../db/modules.js');

// function patients() {
//   return knex('patients');
// }


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
