// const express = require('express');
// const router = express.Router();
// const Users = require('../models/users');
// const Modules = require('../db/modules');
// const passport = require('passport');
// var app = express();

// router.get('/login', function(req, res, next) {
//   console.log('landing-get: ' + req.user);
//   if(req.user) {
//         res.render('landing');
//   } else {
//     res.render('/login', { error: "You need to validate through LinkedIn" });
//   }
// });

// router.get('/logout', (req, res, next) => {
//   req.session = null;
//   res.redirect('logout');
// });

// router.post('/login', (req, res, next) => {
//   Users.authenticateUser(req.user.admin, (err, user) => {
//     if (err) {
//       res.render('/login', {error: err});
//     } else {
//       req.session.username = user.name;
//       console.log('landing-post: ' + req.session.username);
//       res.redirect('patientData');
//     }
//   });
// });

// module.exports = router;
