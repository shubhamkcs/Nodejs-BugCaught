var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/sim',(req, res, next) =>
  res.send('respond with a bug !!')
);

router.get('/demo',(req,res,next) =>
  res.send('Demo brother demo from bug!!')
);

module.exports = router;
