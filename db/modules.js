const knex = require('./knex');
var thirtyDays = new Date();
    thirtyDays.setDate(thirtyDays.getDate()-30);
var sixtyDays = new Date();
    sixtyDays.setDate(sixtyDays.getDate()-60);
var ninetyDays = new Date();
    ninetyDays.setDate(ninetyDays.getDate()-90);

var pgFormatDate = function(date)  {
  function zeroPad(d) {
    return ("0" + d).slice(-2)
  }

  var parsed = new Date(date)

  return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate())].join('');
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
  compliantInitialHra: function initialHRA () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('measures.initial_hra');
  }
}
