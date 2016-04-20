var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Modules = require('../db/modules');

router.get('/landing', (req, res, next)=> {
  res.render('landing', { company: "SNP" })
});

module.exports = router;
