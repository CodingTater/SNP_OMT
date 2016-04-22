var express = require('express');
var router = express.Router();

const knex = require('../db/knex.js');
const Modules = require('../db/modules.js');

router.get('/', function(req, res, next) {
  console.log('got in here');
  res.render('index')
});


module.exports = router;
