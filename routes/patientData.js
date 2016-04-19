var express = require('express');
var router = express.Router();

router.get('/patientData', (req, res, next)=> {
  res.render('patientData');
});

router.post('/patientData', (req, res, next)=> {
  modules.patients().insert({ last: req.body.last, first: req.body.first, gender: req.body.gender, age: req.body.age, pcp: req.body.pcp, enrollment: req.body.enroll, disenrollment: req.body.disenroll, diabetes: req.body.diabetes, osteoporosis: req.body.osteoporosis, cancer: req.body.cancer, copd: req.body.copd, esrd: req.body.esrd, heart: req.body.heart, fracture: req.body.fracture });
});

router.get('patientData/:id', (req, res, next)=> {
  modules.patients().where({ id : req.params.id });
});

router.put('/patientData/:id', (req, res, next)=> {
  modules.patients().update({ last: req.body.last, first: req.body.first, gender: req.body.gender, age: req.body.age, pcp: req.body.pcp, enrollment: req.body.enroll, disenrollment: req.body.disenroll, diabetes: req.body.diabetes, osteoporosis: req.body.osteoporosis, cancer: req.body.cancer, copd: req.body.copd, esrd: req.body.esrd, heart: req.body.heart, fracture: req.body.fracture }).where({ id : req.params.id })
})

router.delete('/patientData/:id', (req, res, next)=> {
  modules.patients().delete().where({ id: req.params.id });
});


module.exports = router;
