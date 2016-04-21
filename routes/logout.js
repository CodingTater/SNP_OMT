var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/logout', (req, res, next) => {
  req.session = null;
  res.redirect('logout');
});

module.exports = router;
