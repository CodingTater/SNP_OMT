const knex = require('./knex');

module.exports = {
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

  patientsMeasures: function patientsMeasures() {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id');
  }

}
