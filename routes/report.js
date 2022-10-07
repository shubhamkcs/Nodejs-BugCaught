var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', (req, res, next) =>
  res.send('respond with a bug !!')
);

router.get('/demo',(req,res,next) =>
  res.send('Demo brother demo from report!!')
);

module.exports = router;
