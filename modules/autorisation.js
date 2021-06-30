const con = require('../db/connectToDB').con;
const {token, log, addCookies, clienttoken, getTableRecord} = require('./service');
const {renderPage} = require('./renderPage');
// const Cookies = require('cookies');


//render page if bad autorization 
const renderNotPage = (req, res, err) => {
    res.render(`notfound`, {
        // permissAccess: `${permissionAccess}`,
        // permissEdit: `${permissionEdit}`,
        // permissName: ``,
        // permissSurname: ``,
        // permissUserid: ``,
        // onindex:`err_autoriz`,
        // setsettings:`false`,
        // errautoriz:`${err}`,
        // userid: ``,
        // activee: `noactive`,
        // title:``
    });
};

const autorisationSocial = (profile, done) => {
    console.log(profile);
    con.query(`SELECT * FROM users WHERE userid = '${profile.id}'`, (error, result) => {
        if (error) { 
            done(`Problem with created user: ${error}`, null); 
        } else if (result && result.length === 0) {   
            //create new user     
            return done(null, profile);  
        } else if (result[0].userid === user.id){
            //return user info
            return done(null, profile);
        } else {
            return done(`code-error`, null);
        }; 
    }); 
};

const SetCookie = (req, res, user) => {
    const tokenId = token(20);
    con.query(`UPDATE users SET token = '${tokenId}' WHERE userid = '${user.id}'`, (error, result) => {
        if (error) { 
            addCookies(req, res, '', '-1');
            renderPage(req, res, 'main', `Token update error: ${error}`); 
        } else {        
            addCookies(req, res, tokenId, '');    
            res.redirect('/'); 
        };          
    });    
};

const autorisationCheck = async (req, res) => {
    return await getTableRecord(`SELECT userid FROM users WHERE token = '${clienttoken(req, res)}'`)
    .then((user) => { 
        return (user.err || user == '') ? false : user[0].userid; 
    });
};



module.exports = {
    SetCookie,
    autorisationSocial,
    renderNotPage,
    autorisationCheck
}