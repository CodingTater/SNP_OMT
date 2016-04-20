var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Modules = require('../db/modules');

/* GET home page. */

router.get('/', (req, res, next)=> {
  res.render('patientData');
});


module.exports = router;
