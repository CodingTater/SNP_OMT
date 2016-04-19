var express = require('express');
var router = express.Router();

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

module.exports = router;
