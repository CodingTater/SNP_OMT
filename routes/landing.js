const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Modules = require('../db/modules');

const ensureLoggedIn = (req, res, next) => {
  if (req.user) {
    console.log('checked user');
    next();
  }
  else {
    console.log('redirecting');
    res.redirect('/');
  }
}

router.get('/', ensureLoggedIn, (req, res, next) => {
  res.render('landing');
});

router.post('/', ensureLoggedIn, (req, res, next)=> {

    res.render('edit')
  })

module.exports = router;
