var mysql = require('mysql');
require('dotenv').config();

var connection = mysql.createConnection({
    host : process.env.host,
    user : process.env.user,
    password : process.env.password,
    database : process.env.database
});

connection.connect(function(error)
{
    console.log('Connecting to the database....')
    if(error)
    {
        console.log('Something went wrong while connecting to database !');
    }
    else{
        console.log('Successfully Connected !');
    }
});

module.exports = connection;