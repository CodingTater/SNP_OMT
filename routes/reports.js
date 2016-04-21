var express = require('express');
var router = express.Router();
var moment = require('moment');
const knex = require('../db/knex.js');
const Modules = require('../db/modules.js');

router.get('/', (req, res, next)=> {
    res.render('reports', {title: 'Reports'});
});


router.get('/initial_hra', (req, res, next) => {
  var array = [];
  var iHraSixtyPlusDays = Modules.iHraSixtyPlusDays();
  var iHraThirtyToSixty = Modules.iHraThirtyToSixty();
  var iHraNextThirtyDays = Modules.iHraNextThirtyDays();
  var iHraOverDue = Modules.iHraOverDue();

  Promise.all([iHraSixtyPlusDays, iHraThirtyToSixty, iHraThirtyToSixty, iHraOverDue]).then(function (data) {
    array = [
      {title: 'Initial HRA'},

      {label: 'More than 60 Days', count: data[0].length},
      {label: 'More than 30 Days', count: data[1].length},
      {label: 'Less than 30 Days', count: data[2].length},
      {label: 'Overdue', count: data[3].length},
    ];
    res.send(array);
  });
});


router.get('/c01_breast', (req, res, next) => {
  Modules.c01_breast().then(function (data) {
    var array = [];
    var ninetyPlus = [];
    var sixtyToNinety = [];
    var thirtyToSixty = [];
    var thirtyLess = [];
    var overThirtyLess = [];
    var overThirtyToSixty = [];
    var overSixtyToNinety = [];
    var overNinety = [];

    for (var i = 0; i < data.length; i++) {
      var patient = data[i];
      var patientE = patient.enrollment;
      var patientB = patient.c01_breast;
      if (patientE < moment().subtract(1, 'y')) {
      patientE = moment(patientE).set('year', 2015);
      }
      if (moment(patientB).isBetween(moment().subtract(1, 'y'), moment()))   { ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(275, 'd')) && patientB === null) {
        ninetyPlus.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(305, 'd')) && patientB === null) {
        sixtyToNinety.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(335, 'd')) && patientB === null) {
        thirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(1, 'y')) && patientB === null) {
        thirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(395, 'd')) && patientB === null) {
        overThirtyLess.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(425, 'd')) && patientB === null) {
        overThirtyToSixty.push(patient);
      } else if (moment(patientE).isAfter(moment().subtract(455, 'd')) && patientB === null) {
        overSixtyToNinety.push(patient);
      } else if (moment(patientE).isSameOrBefore(moment().subtract(455, 'd')) && patientB === null) {
        overNinety.push(patient);
      }  else if (moment(patientB).isBetween(moment(patientE).add(30, 'd'), moment())){
        thirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(60, 'd'), moment())){
        thirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).add(90, 'd'), moment())){
        sixtyToNinety.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE), moment())){
        ninetyPlus.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(30, 'd'), moment())){
        overThirtyLess.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(60, 'd'), moment())){
        overThirtyToSixty.push(patient);
      } else if (moment(patientB).isBetween(moment(patientE).subtract(90, 'd'), moment())){
        overSixtyToNinety.push(patient);
      } else if (moment(patientB).isSameOrBefore(moment(patientE).subtract(90, 'd'), moment())){
        overNinety.push(patient);
      } else {
        overNinety.push(patient);
      }
  }
  Promise.all([ninetyPlus, sixtyToNinety, thirtyToSixty, thirtyLess, overThirtyLess, overThirtyToSixty, overSixtyToNinety, overNinety]).then(function (data) {
    array = [
      {title: 'Breast Cancer Screening'},
      {label: 'More than 90 Days', count: ninetyPlus.length},
      {label: 'Between 90 and 60 Days', count: sixtyToNinety.length},
      {label: 'Between 60 and 30 Days', count: thirtyToSixty.length},
      {label: 'Less than 30 Days', count: thirtyLess.length},
      {label: 'Overdue less than 30 Days', count: overThirtyLess.length},
      {label: 'Overdue between 30 and 60 Days', count: overThirtyToSixty.length},
      {label: 'Overdue between 60 and 90 Days', count: overSixtyToNinety.length},
      {label: 'Overdue more than 90 Days', count: overNinety.length},
    ];
    res.send(array);
    });
  });
});


// for (var i = 0; i<data.length; i++) {
//   if (data[i].enrollment > today - 365) {
//
//   }
// }
// array = [
//   {title: 'Breast Cancer Screening'},
//   {label: 'More than 90 Days', count: data[0].length},
//   {label: 'More than 60 Days', count: data[1].length},
//   {label: 'More than 30 Days', count: data[2].length},
//   {label: 'Less than 30 Days', count: data[0].length},
//   {label: 'Overdue less than 30 Days', count: data[1].length},
//   {label: 'Overdue less than 60 Days', count: data[2].length},
//   {label: 'Overdue less than 90 Days', count: data[1].length},
//   {label: 'Overdue more than 90 Days', count: data[2].length},
// ];

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
