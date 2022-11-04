const User = require('../model/user');
const bcrypt = require('bcrypt');


/**
 * 
 * @param {*} req for http request
 * @param {*} res for http response
 */
exports.findAll = (req, res) => {
    User.findAll((err, rows) => {
        if (err) {
            res.status(500).send({
                message: "Something went wrong while retrieving User."
            });
        }
        else {
            res.send(rows);
        }
    });
}


/**
 * 
 * @param {*} req for http request
 * @param {*} res for http response
 * @param {*} error 
 */
exports.saveUser = async (req, res, error) => {

    if(req.body.uid == null || req.body.uemail == null || req.body.ufname == null || req.body.ulname == null || req.body.upassword == null || req.body.role_user_role_id == null)
    {
        res.status(405).send({
            message : "Request body should not be Empty !"
        });
    }

    const user = new User({
        uid: req.body.uid,
        uemail: req.body.uemail,
        ufname: req.body.ufname,
        ulname: req.body.ulname,
        upassword: await bcrypt.hash(req.body.upassword,12),
        role_user_role_id: req.body.role_user_role_id

    });

    User.create(user, (err, data) => {
        if (err){
           res.status(403).send({
             message : "Record Already Exists"
           });
        }
        else {res.json(data);}
    });
}


/**
 * 
 * @param {*} req for http request
 * @param {*} res for http response
 */
exports.findUserByUid = (req, res) => {
    User.findUserByUid(req.params.uid, (error, rows) => {
        if (error) {
            if (error.errorMsg == "user_not_found") {
                res.status(404).send({
                    message: "User not found !!"
                });
            }
            else {
                res.status(500).send({
                    message: "Something went wrong while retrieving User with userid"
                });
            }
        }
        else {
            res.status(200).send(rows);
        }
    });
};


/**
 * 
 * @param {*} req for http request
 * @param {*} res for http response
 */
exports.loginchk = async (req,res) => {

    var email = req.body.uemail;
    var password = req.body.upassword;
     
    User.findUserByEmailPsw(email,password, (error,rows) => {

        if(error)
        {
            if (error.errorMsg == "user_not_found") {
                res.render('Developer/login',{ errMsg : 'Incorrect Email or Password !!'});
            }
            else {
                res.render('Developer/login',{ errMsg : 'Please Try Again !' });
            }
        }
        else{
            res.send('user validated successfully');
        }
    })
 };


 /**
  * 
  * @param {*} req for http request
  * @param {*} res for http response
  */
exports.deleteUserById = (req, res) => {

    User.DeleteByUid(req.params.uid, (error, rows) => {
        if (error) {
            if (error.errorMsg == "user_not_found") {
                res.status(404).send({
                    message:
                        error.message || "User not found !!"
                });
            }
            else {
                res.status(500).send({
                    message:
                        error.message || "Something went wrong while retrieving User with userid"
                });
            }
        }
        else {
            res.status(200).send({
                message: "user Deleted !!"
            });
        }
    });
};


/**
 * 
 * @param {*} req for http request
 * @param {*} res for http response
 */
exports.updateUserById = (req, res) => {

    if(req.body.uid == null || req.body.uemail == null || req.body.ufname == null || req.body.ulname == null || req.body.upassword == null || req.body.role_user_role_id == null)
    {
        res.status(405).send({
            message : "Request body should not be Empty !"
        });
    }

        User.UpdateByUid(req.params.uid, new User(req.body), (err) => {
            if (err) {
                if (err.errorMsg == "not_found") {
                    res.status(404).send({
                        message : 'User Not Found !!'
                    });
                }
                else {
                    res.status(500).send({
                        message: 'Something Went wrong !!'
                    })
                }
            }
            else {
                res.status(200).send({
                    message : 'User Updated Successfully !!'
                });
            }
        })

};


/**
 * 
 * @param {*} req for http request
 * @param {*} res for http response
 */
exports.createToken = (req,res) => {

    User.createjwToken(req.body.uemail,req.body.upassword , (error,rows) => {
        if(error)
        {
            if(error.errorMsg == 'user_not_found')
            {
                res.status(404).send({
                    message : "User Not Found !!"
                });
            }
            else if(error.errorMsg == "Incorrect_Password"){
                res.status(401).send({
                    message : 
                        error.message || "Incorrect Password !"
                });
            }
            else{
                res.status(500).send({
                    message : "Something Went Wrong !!"
                });
            }
        }
        else{
            res.status(200).send({
             token : rows  
            });
        }
    });
};


/**
 * 
 * @param {*} req for http request
 * @param {*} res for http response
 */
exports.validateApis = (req,res) => {
    const token = req.headers['access-token'];
   
    User.validateApi( token ,(error,decode) => {
        if(error)
        {
            if(error.errorMsg == "token_empty")
            {
                res.status(403).send({
                    message : "Api contains Token , Please pass the Token"
                })    
            }
            else if(error.errorMsg == "Invalid")
            {
                res.status(401).send({
                    message : "Invalid Access-Token"              
                })
            }
            else
            {
                res.status(402).send({
                    message : "Something went wrong !!"
                });
            }
        }
        else
        {
            console.log("token varified !!");
             res.json(decode);
        }
    });
};
// exports.validatingReq = (req,res) => {

//     let value = req.body.value;
//     if(value.length === 0) {
//         return res.status(500).send({
//             error: "empty value"
//         });
//     }
//     else{
//         res.status(200).send({result: "OK"});
//     }
    
//     next();

// };

