var express = require('express');
var router = express.Router();

router.get('/reports', (req, res, next)=> {
  res.render('reports');
});

module.exports = router;
