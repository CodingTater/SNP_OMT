var express = require('express');
var router = express.Router();


router.get('/', (req, res, next)=> {
  // log(req.user.admin);
  res.render('login');
});


module.exports = router;
