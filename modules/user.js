const con = require('../db/connectToDB').con;
const log= require('./service').log;

const DATA = {
    errors : {
        errMessage : '',
        SERVER_ERROR : '',
    },
    permission : {  }
};

const clearDATA = () => {
    DATA.errors.SERVER_ERROR = '';
};

const addUser = (profile, done) => {
    const date = new Date();        
    const sql = `INSERT INTO users (userid, name, surname, email, date_registered, ava, provider) 
               VALUES ('${profile.id}', 
               '${profile.name.givenName === undefined ? "" : profile.name.givenName}', 
               '${profile.name.familyName === undefined ? "" : profile.name.familyName}', 
               '${profile.emails === undefined ? "" : profile.emails[0].value}', 
               '${date.toISOString().slice(0,10)} ${date.getHours()}:${date.getMinutes()}', 
               '${profile.photos === undefined ? "" : profile.photos[0].value}', 
               '${profile.provider === undefined ? "" : profile.provider}')`;     
    con.query(sql, (error, result) => {
        error 
            ? done(`Error creating user record: ${error}`, null) 
            : done(null, profile);
    });
};

const isUser = (profile) => {
    con.query(`UPDATE users SET 
        name = '${profile.name.givenName === undefined ? "" : profile.name.givenName}', 
        surname = '${profile.name.givenName === undefined ? "" : profile.name.givenName}', 
        ava = '${profile.photos === undefined ? "" : profile.photos[0].value}' 
    WHERE userid = '${profile.id}'`, (err, result) => { 
        if (err) { log("error-update-user", err.code) };
    });
};

module.exports = {
    addUser,
    isUser,
    clearDATA,
    DATA
}