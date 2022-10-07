const express = require('express');
const router = express.Router();
const Users = require('../controller/userController');

/* GET home page. */

/**
 * Login system start
 */

router.get('/', (req, res, next) =>
    res.redirect('/login')
);

router.get('/login', (req, res, next) =>
    res.render('Developer/login', { errMsg: 'Welcome back !' })
);

router.post('/loginchk', Users.loginchk);

/**
 *  Login system end 
 */


/**
 * Crud API start
 */

router.get('/users', Users.findAll);

router.get('/users/:uid', Users.findUserByUid);

router.post('/users', Users.saveUser);

router.delete('/users/:uid', Users.deleteUserById);

router.put('/users/:uid', Users.updateUserById);

/**
 * Crud API End
 */

/**
 * JWT
 */
  
router.post('/loginjwt', Users.createToken);

router.get('/varifyAPI',Users.validateApis);

router.get('/test', (req,res) =>{
    console.log(process.argv);
    const myargs = process.argv.slice(2);
    console.log('my args',myargs);
});

module.exports = router;
