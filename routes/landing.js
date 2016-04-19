var express = require('express');
var router = express.Router();

router.get('/landing', (req, res, next)=> {
  res.render('landing', { company: "SNP" })
});

module.exports = router;
