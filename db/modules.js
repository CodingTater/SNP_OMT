const knex = require('./knex');

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
  initialHRA: function initialHRA () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select('patients.id', 'patients.last', 'patients.pcp', 'patients.enrollment', 'measures.initial_hra')
  }
}
