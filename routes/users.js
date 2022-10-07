var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', (req, res, next) =>
  res.send('respond with a resource')
);

router.get('/demo', (req,res,next) =>
  res.send('Demo brother demo !!')
);

module.exports = router;
