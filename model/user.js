var connection = require('../Database/dbConnect');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

/**
 * @author shubham varneshiya
 */

class User {
    constructor(user) {
        this.uid = user.uid;
        this.uemail = user.uemail;
        this.ufname = user.ufname;
        this.ulname = user.ulname;
        this.upassword = user.upassword;
        this.role_user_role_id = user.role_user_role_id;
    }

    /**
     * 
     * @param {*} newUser parameter playload of user
     * @param {*} result set return value 
     */
    static create(newUser, result) {

        connection.query('INSERT INTO users SET ?', newUser, (err, res) => {
            if (err) {
                result(err);
            }
            else {
                console.log("User Inserted ! ");
                result(null, { message: 'user Inserted Succesfully', newUser });
            }
        });
    }


    /**
     * 
     * @param {*} result set return value 
     */
    static findAll(result) {
        connection.query('SELECT * FROM users', (err, res) => {
            if (err) {
                result(err);
                return;
            }
            else {
                result(null, res);
            }

        });
    }

    /**
     * 
     * @param {*} uid 
     * @param {*} result 
     */
    static findUserByUid(uid, result) {

        connection.query(`SELECT * FROM users WHERE uid = ${uid}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err);
                return;
            }

            if (res[0] == null) {
                console.log('User Not found !!');
                result({ errorMsg: "user_not_found" });
            }
            else {
                console.log(res);
                console.log(`user found with ${uid}`);
                result(null, res[0]);
            }
        });
    }

    /**
     * 
     * @param {*} uemail 
     * @param {*} upassword 
     * @param {*} result 
     */
    static findUserByEmailPsw(uemail, upassword, result) {

        connection.query('SELECT * FROM users WHERE uemail = ?', [uemail], async (err, res) => {

            if (err) {
                console.log("Error : ", err);
                result(err);
                return;
            }

            if (res[0] == null) {
                console.log('User not found !!');
                result({ errorMsg: "user_not_found" });
            }
            else {

                var hassedPass = res[0].upassword;
                if (await bcrypt.compare(upassword, hassedPass)) {
                    console.log('user found !!');
                    result(null, res[0]);
                }
            }
        });
    }

    /**
     * 
     * @param {*} uid 
     * @param {*} result 
     */
    static DeleteByUid(uid, result) {

        console.log(uid);
        connection.query(`DELETE FROM users WHERE uid = ${uid}`, (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(err);
                return;
            }

            if (res.affectedRows == 0) {
                console.log('User Not found !!');
                result({ errorMsg: "user_not_found" });
            }
            else {
                console.log(`user Deleted with ${uid}`);
                result(null, res);
            }
        });
    }

    /**
     * 
     * @param {*} uid 
     * @param {*} user 
     * @param {*} result 
     */
    static UpdateByUid(uid, user, result) {

        connection.query('UPDATE users SET uemail = ?,ufname = ?,ulname = ?,upassword = ?,role_user_role_id = ? WHERE uid =?', [user.uemail, user.ufname, user.ulname, user.upassword, user.role_user_role_id, uid], (err, res) => {

            if (err) {
                console.log(err);
                result(err);
                return;
            }

            if (res.affectedRows == 0) {
                console.log('User Not found !!');
                result(err, { errorMsg: "not_found" });
            }
            else {
                console.log("User Updated Successfully !!");
                result(err, { id: uid, result });
            }
        });
    }

    /**
     * 
     * @param {*} uemail 
     * @param {*} upassword 
     * @param {*} result 
     */
    static createjwToken(uemail, upassword, result) {

        connection.query('SELECT * FROM users WHERE uemail = ?', [uemail], async (err, rows) => {
            if (err) {
                console.log(err);
                result(err);
                return;
            }
            if (rows[0] == null) {
                console.log('user not found');
                result(err, { errorMsg: "user_not_found" });
            }
            else {
                var hassedPass = rows[0].upassword;
                if (await bcrypt.compare(upassword, hassedPass)) {
                    const token = jwt.sign({ rows }, process.env.SECURITY_TOKEN, { expiresIn: '30m' });
                    result(err, token);
                }
                else {
                    result({ errorMsg: "Incorrect_Password" });
                }
            }
        });
    }

    /**
     * 
     * @param {*} token 
     * @param {*} result 
     * @param {*} error 
     */
    static validateApi(token, result, error) {

        if (!token || token == null) {
            console.log('token is empty');
            result({ errorMsg: "token_empty" });
        }
        try {
            const decode = jwt.verify(token, process.env.SECURITY_TOKEN);
            result(error, decode);
        } catch (error) {
            //console.assert(false,error);
            // console.clear();
            // console.count('Error cnt :');
            // console.error('error',error);
            // console.table([{ 'error Message': error.message }]);
            // console.time('Response time');
            // console.log('hello semicolon ;');
            // console.timeEnd('Response time');
            // console.profile('MyLabel');
            // console.log('hello semicolon ;');
            // console.log('hello semicolon ;');
            // console.log('hello semicolon ;');
            // console.profileEnd('MyLabel');
            // console.trace(error.message);
            // console.timeStamp();
            // console.error(new Error('Oy ruk , problem he!'));
            result({ errorMsg: "Invalid" });
        }
    }
}









module.exports = User;