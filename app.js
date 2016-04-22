const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const login = require('./routes/login');
const passport = require('passport');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const knex = require('./db/knex.js');
const routes = require('./routes/index');
const landing = require('./routes/landing');
const addPatient = require('./routes/add_patient');
const editPatient = require('./routes/edit_patient');
const reports = require('./routes/reports');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const app = express();
require('dotenv').load();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: process.env.HOST + "/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true,
}, function(accessToken, refreshToken, profile, done) {
    knex('users').where({ pass: profile.id }).first().then((user) => {
      if (!user) {
        knex('users').insert({
          name: profile.displayName,
          pass: profile.id,
          email: profile.emails[0].value,
          photo: profile.photos[0].value
        }, '*').then(newUser => {
          return done(null, newUser[0]);
        });
      } else {
        // console.log(us);
        return done(null, user);
      }
    });
}));

passport.serializeUser(function(user, done) {
  // console.log('serialize', user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // console.log('deserialize', user);
  done(null, user);
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY]
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(methodOverride('_method'));
app.use('/', routes);
app.use('/login', login);
app.use('/landing', landing);
app.use('/add_patient', addPatient);
app.use('/edit_patient', editPatient);
app.use('/reports', reports);


app.get('/auth/linkedin', passport.authenticate('linkedin'));

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/landing',
  failureRedirect: '/'
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
