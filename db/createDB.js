const con = require('./connectToDB').con;

const users = () => {
    const sql = `CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,
        userid VARCHAR(100) NOT NULL UNIQUE,
        token VARCHAR(30),
        ava VARCHAR(255), 
        name VARCHAR(80) NOT NULL, 
        surname VARCHAR(80) NOT NULL,
        email VARCHAR(60) DEFAULT '',
        emailverified VARCHAR(60) DEFAULT '',
        birthday DATE,
        gender VARCHAR(11) DEFAULT '',
        provider VARCHAR(40),                   
        date_registered DATETIME
        )`; 
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table users created")});
};

const userssettings = () => {
    const sql = `CREATE TABLE userssettings (id INT AUTO_INCREMENT PRIMARY KEY,
        userid VARCHAR(100) NOT NULL UNIQUE,
        interface VARCHAR(20) DEFAULT 'en-US',    
        my_lang VARCHAR(20) DEFAULT 'none',    
        voice VARCHAR(60) DEFAULT 'Google UK English Female',                   
        speed VARCHAR(40) DEFAULT '1', 
        pitch VARCHAR(40) DEFAULT '1',            
        color VARCHAR(20) DEFAULT 'blue'            
        )`; 
    con.query(sql, function (err, result) {if (err) throw err; console.log("Table userssettings created")});
};



module.exports = {
    users,
    userssettings
};