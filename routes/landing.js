const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Modules = require('../db/modules');

router.get('/', function(req, res, next) {
  if(req.user) {
        res.render('landing', { company: "SNP" });
  } else {
    res.redirect('/login', { error: "You need to validate through LinkedIn" });
  }
});

module.exports = router;
