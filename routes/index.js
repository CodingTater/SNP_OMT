var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Modules = require('../db/modules');

/* GET home page. */

router.get('/', (req, res, next) => {
  // Modules.initialHRA().then(function(data) {
  //   console.log(data);
    res.render('index', {title: "company name"});
  });
// });



module.exports = router;

// select measures.initial_hra::date - patients.enrollment::date from measures join patients on patients.id = measures.patient_id;
//
// return knex.raw(select measures.initial_hra::date - patients.enrollment::date).from('measures').
