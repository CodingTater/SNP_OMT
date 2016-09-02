const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Modules = require('../db/modules');

<<<<<<< HEAD

=======
>>>>>>> bd4eef688cadb436770a6bac355ed5da396066ac
router.get('/', function(req, res, next) {
  if(req.user) {
        res.render('landing', { company: "Fortified Health" });
  } else {
<<<<<<< HEAD
    res.redirect('/login', { error: "You need to validate through LinkedIn" });
=======
    res.redirect('/');
>>>>>>> bd4eef688cadb436770a6bac355ed5da396066ac
  }
});

router.get('/', (req, res, next) => {
  res.render('landing');
});


module.exports = router;
