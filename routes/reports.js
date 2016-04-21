var express = require('express');
var router = express.Router();
var moment = require('moment');
const knex = require('../db/knex.js');
const Modules = require('../db/modules.js');
// const yearAgo = new Date();
//     yearAgo.setDate(yearAgo.getDate()-365);
// const thirty = new Date();
//     thirty.setDate(thirty.getDate()-335);
// const sixty = new Date();
//     sixty.setDate(sixty.getDate()-305);
// const ninety = new Date();
//     ninety.setDate(ninety.getDate()-275);
// const thirtyOver = new Date();
//     thirtyOver.setDate(thirtyOver.getDate()-395);
// const sixtyOver = new Date();
//     sixtyOver.setDate(sixtyOver.getDate()-425);
// const ninetyOver = new Date();
//     ninetyOver.setDate(ninetyOver.getDate()-455);

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
    array = [];
    console.log();
    res.send(array);
    });

  });
});

router.get('/c01_breast', (req, res, next) => {
  var array = [];
  var ninetyPlus = [];
  var sixtyToNinety = [];
  var thirtyToSixty = [];
  var thirtyLess = [];
  var overThirtyLess = [];
  var overThirtyToSixty = [];
  var overSixtyToNinety = [];
  var overNinety = [];
  Modules.c01_breast().then(function (data) {
      array.push(moment(data[0].enrollment));

  }
  // Promise.all([ninetyPlus, sixtyToNinety, thirtyToSixty, thirtyLess, overThirtyLess, overThirtyToSixty, overSixtyToNinety, overNinety]).then(function (data) {
  //   array = [
  //     {title: 'Breast Cancer Screening'},
  //     {label: 'More than 90 Days', count: ninetyPlus.length},
  //     {label: 'Between 90 and 60 Days', count: sixtyToNinety.length},
  //     {label: 'Between 60 and 30 Days', count: thirtyToSixty.length},
  //     {label: 'Less than 30 Days', count: thirtyLess.length},
  //     {label: 'Overdue less than 30 Days', count: overThirtyLess.length},
  //     {label: 'Overdue between 30 and 60 Days', count: overThirtyToSixty.length},
  //     {label: 'Overdue between 60 and 90 Days', count: overSixtyToNinety.length},
  //     {label: 'Overdue more than 90 Days', count: overNinety.length},
  //   ];
    res.send(array);
    // });
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
