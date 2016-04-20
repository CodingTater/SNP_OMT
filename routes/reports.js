var express = require('express');
var router = express.Router();
const knex = require('../db/knex.js');
const Modules = require('../db/modules.js');


router.get('/reports', (req, res, next)=> {
    res.render('reports', {title: 'Reports'});
});

router.get('/reports/initial_hra', (req, res, next) => {
  Modules.patients().select().limit(10).then(function(data) {
    console.log(data);
    res.render('reports', {title: data[0].last});
  });
});
//
// router.get('/reports/recent_hra', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/reports/initial_icp', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/reports/recent_icp', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/reports/c01_breast', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/reports/c02_cancer', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/reports/c03_flu_vac', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
// router.get('/reports/c12_osteoporosis', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/reports/c13_betus_eyecare', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });
//
// router.get('/reports/c14_betus_kidneycare', (req, res, next) => {
//   Modules.patients().select().limit(10).then(function(data) {
//     console.log(data);
//     res.render('reports', {title: data[0].last});
//   });
// });



module.exports = router;
