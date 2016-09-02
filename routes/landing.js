const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Modules = require('../db/modules');


router.get('/', function(req, res, next) {
  if(req.user) {
        res.render('landing', { company: "Fortified Health" });
  } else {
    res.redirect('/login', { error: "You need to validate through LinkedIn" });
  }
});

router.get('/', ensureLoggedIn, (req, res, next) => {
  res.render('landing');
});

<<<<<<< HEAD
router.post('/', ensureLoggedIn, (req, res, next)=> {

    res.render('edit')
  })
=======
>>>>>>> 78d78fe62cf5d313e6115140a8f46c79a72cb39d

module.exports = router;
