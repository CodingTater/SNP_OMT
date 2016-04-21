const knex = require('./knex');
var thirtyDays = new Date();
    thirtyDays.setDate(thirtyDays.getDate()-30);
var sixtyDays = new Date();
    sixtyDays.setDate(sixtyDays.getDate()-60);
var ninetyDays = new Date();
    ninetyDays.setDate(ninetyDays.getDate()-90);
var yearAgo = new Date();
    yearAgo.setDate(yearAgo.getDate()-365);


var pgFormatDate = function(date)  {
  function zeroPad(d) {
    return ("0" + d).slice(-2)
  }

  var parsed = new Date(date)

  return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate())].join('');
};

var newEnrollees = function(data) {
  var newEnrollee = [];
  var oldEnrollee = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].enrollment > yearAgo) {
      newEnrollee.push(data[i]);
    } else {
      oldEnrollee.push(data[i]);
    }
  }
};

module.exports = {
  users:  function users() {
    return knex('users');
  },

  patients: function patients() {
    return knex('patients');
  },

  measures: function measures() {
    return knex('measures');
  },

  initialHRA: function initialHRA() {
    return knex('patients').join('measures', 'measures.patient_id', 'patients.id').select('measures.initial_hra', 'patients.enrollment');
  },

  enrollment: function enrollment() {
    return knex('patients').select('disenrollment');
  },

  dateDiff: function dateDiff(data) {
    var temp = [];
    for (var i = 0; i < data.length; i++) {
      temp.push((data[i].initial_hra - data[i].enrollment)/86400000);
    }
    return temp;
  },

  patientsMeasures: function patientsMeasures() {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id');
  },

  iHraSixtyPlusDays: function iHraSixtyPlusDays () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereNull('measures.initial_hra').where('enrollment', '>', pgFormatDate(thirtyDays));
  },
  iHraThirtyToSixty: function iHraThirtyToSixty () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereNull('measures.initial_hra').where('enrollment', '>', pgFormatDate(sixtyDays)).whereNot('enrollment', '>', pgFormatDate(thirtyDays));
  },
  iHraNextThirtyDays: function iHraNextThirtyDays () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereNull('measures.initial_hra').where('enrollment', '>', pgFormatDate(ninetyDays)).whereNot('enrollment', '>', pgFormatDate(sixtyDays));
  },
  iHraOverDue: function iHraOverDue () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereNull('measures.initial_hra').whereNot('enrollment', '>', pgFormatDate(ninetyDays));
  },
  c01_breast: function c01_breast () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.gender', 'Female').then(function (data) {
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
        if (moment(patientB).isBetween(moment().subtract(1, 'y'), moment())) { ninetyPlus.push(patient);
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
  }
}
