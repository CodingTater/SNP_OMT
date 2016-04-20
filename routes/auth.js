var express = require('express');
var router = express.Router();
var Modules = require('../db/modules');
var passport = require('passport');

var app = express();

app.get('/auth/linkedin',
  passport.authenticate('linkedin'));

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


app.get('/auth/linkedin', passport.authenticate('linkedin'));

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


module.exports = router;
