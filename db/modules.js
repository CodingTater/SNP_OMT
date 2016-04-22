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
  
  c01_breast: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.gender', 'Female');
  },
  c02_cancer: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().whereBetween('patients.age', [50, 75]);
  },
  c03_flu_vac: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select();
  },
  c12_osteoporosis: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.gender', 'Female').where('patients.fracture', true);
  },
  c13_betus_eyecare: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.diabetes', true);
  },
  c14_betus_kidneycare: function () {
    return knex('patients').innerJoin('measures', 'patients.id', 'measures.patient_id').select().where('patients.diabetes', true);
  }
}
