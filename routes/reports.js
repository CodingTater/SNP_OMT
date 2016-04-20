var express = require('express');
var router = express.Router();
const knex = require('../db/knex.js');
const Modules = require('../db/modules.js');


router.get('/', (req, res, next)=> {
    res.render('reports', {title: 'Reports'});
});

router.get('/initial_hra', (req, res, next) => {
  Modules.initialHRA().then(function(data) {
    var dateDiff = (data[0].initial_hra - data[0].enrollment)/86400000;
    console.log(dateDiff);
    res.render('reports', {title: data[0].last});
  });
});

// router.get('/recent_hra', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/initial_icp', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/recent_icp', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/c01_breast', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/c02_cancer', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/c03_flu_vac', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
// router.get('/c12_osteoporosis', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/c13_betus_eyecare', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/c14_betus_kidneycare', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
//

module.exports = router;
