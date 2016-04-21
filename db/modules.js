const knex = require('./knex');
var thirtyDays = new Date();
    thirtyDays.setDate(thirtyDays.getDate()-30);
var sixtyDays = new Date();
    sixtyDays.setDate(sixtyDays.getDate()-60);
var ninetyDays = new Date();
    ninetyDays.setDate(ninetyDays.getDate()-90);
<<<<<<< HEAD
var yearAgo = new Date();
    yearAgo.setDate(yearAgo.getDate()-365);
=======
>>>>>>> master

var pgFormatDate = function(date)  {
  function zeroPad(d) {
    return ("0" + d).slice(-2)
  }

  var parsed = new Date(date)

  return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate())].join('');
};
<<<<<<< HEAD

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
=======
>>>>>>> master

module.exports = {

  patients: function patients() {
    return knex('patients');
  },
  measures: function measures() {
    return knex('measures');
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
<<<<<<< HEAD
  c01_breast: function c01_breast () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.gender', 'Female');
  },
  breastSixtyPlus: function breastSixtyPlus () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.gender', 'female').whereNot('enrollment', '>', pgFormatDate(ninetyDays));
  },
  breastThirtyPlus: function breastThirtyPlus () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereNull('measures.initial_hra').whereNot('enrollment', '>', pgFormatDate(ninetyDays));
  },
  breastLessThanThirty: function breastLessThanThirty () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereNull('measures.initial_hra').whereNot('enrollment', '>', pgFormatDate(ninetyDays));
  },
  breastOverdueThirty: function breastOverdueThirty () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereNull('measures.initial_hra').whereNot('enrollment', '>', pgFormatDate(ninetyDays));
  },
  breastOverdueSixty: function breastOverdueSixty () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereNull('measures.initial_hra').whereNot('enrollment', '>', pgFormatDate(ninetyDays));
  },
  breastOverdueNinety: function breastOverdueNinety () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereNull('measures.initial_hra').whereNot('enrollment', '>', pgFormatDate(ninetyDays));
  },
  breastOverdueNinetyPlus: function breastOverdueNinetyPlus () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereNull('measures.initial_hra').whereNot('enrollment', '>', pgFormatDate(ninetyDays));
  },

=======
  compliantInitialHra: function initialHRA () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('measures.initial_hra');
  }
>>>>>>> master
}
