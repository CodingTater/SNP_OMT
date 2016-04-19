var express = require('express');
var router = express.Router();

router.get('/patientData', (req, res, next)=> {
  res.render('patientData');
});



module.exports = router;
