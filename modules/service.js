// const transliteration = require('transliteration.cyr');
const Cookies = require('cookies');
const fs = require('fs');

//transliteration
const translit = word => {return transliteratedValue = require('transliteration.cyr').transliterate(word)};

//client token
const clienttoken = (req, res) => new Cookies(req, res, {"keys":['volodymyr']}).get('sessionisdd', {signed:true});

//add or clear Cookies
const addCookies = (req, res, token, param) => {
    console.log('param', param);
    const cookies = new Cookies(req, res, {"keys":['volodymyr']});
    cookies.set('sessionisadd', `${token}`, {maxAge: `${param}`, path: '/', signed:true});    
};

//generate token
const token = length => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < length; i++ ) {result += characters.charAt(Math.floor(Math.random() * characters.length))}
    return result;
};

//consoleLog message
const log = (mess, val, arrow = '') => {
    for (let i = 0; i < 25 - mess.length; i++){ arrow += '-' };
    console.log(`--${mess}${arrow}>> `, val);   
};

//date format minutes
const readyMin = function(fullDate){
    const createDate = new Date(fullDate);
    return finDay = ((createDate.getMinutes() >= 1) && (createDate.getMinutes() <= 9)) ? "0" + createDate.getMinutes() : createDate.getMinutes();
};  

//date format day
const readyDay = function(fullDate){
    const createDate = new Date(fullDate);
    return finDay = ((createDate.getDate() >= 1) && (createDate.getDate() <= 9)) ? "0" + createDate.getDate() : createDate.getDate();
};  

//date format month
const readyMonth = function(fullDate){    
    const createDate = new Date(fullDate);
    return finMonth = ((createDate.getMonth() >= 0) && (createDate.getMonth() <= 8)) 
        ? "0" + (createDate.getMonth()+1) 
        : (createDate.getMonth() == 9) ? 10 
        : (createDate.getMonth() == 10) ? 11
        : (createDate.getMonth() == 11) ? 12 : null;          
}; 

//ready full date
const readyFullDate = (fullDate, reverse) => {
    const dateRegFull = new Date(fullDate);
    const dateRegFullEmpty = new Date();
    if (reverse === 'reverse'){
        return dateReg = ((fullDate === '') || (fullDate === undefined)) 
            ? dateRegFullEmpty.getHours() + ":" + readyMin(dateRegFullEmpty) + " " + readyDay(dateRegFullEmpty) + "-" + readyMonth(dateRegFullEmpty) + "-" + dateRegFullEmpty.getFullYear() 
            : dateRegFull.getHours() + ":" + readyMin(dateRegFull) + " " + readyDay(dateRegFull) + "-" + readyMonth(dateRegFull) + "-" + dateRegFull.getFullYear();
    } else {
        return dateReg = ((fullDate === '') || (fullDate === undefined))
            ? dateRegFullEmpty.getHours() + ":" + readyMin(dateRegFullEmpty) + " " + dateRegFullEmpty.getFullYear() + "-" + readyMonth(dateRegFullEmpty) + "-" + readyDay(dateRegFullEmpty)
            : dateRegFull.getHours() + ":" + readyMin(dateRegFull) + " " + dateRegFull.getFullYear() + "-" + readyMonth(dateRegFull) + "-" + readyDay(dateRegFull);
    };
};

//save logs
let accessLog = (req, res, next) => {
    let logs = `IP: ${req.ip}  TIME: ${new Date().toLocaleString()}  URL: ${req.url}\n`;
    let namefile = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    fs.appendFile(`./log/${namefile}.txt`, logs, (err) => {if (err) {console.log(err)}});
    next();
}

//chack on true values
let checOnTrueVal = (el) => {
    let reg = "[^a-zA-Z??-????-??0-9-()_+=.'\":/\,???????????? /\n]";
    let newReg = new RegExp(reg, "gi");    
    let res = el.replace(newReg, '');
    return res;    
}

//get table record
const getTableRecord = (sql) => {
    return new Promise((resolve) => { 
        con.query(sql, function (error, result) { 
            error ? resolve({'error': error}) : resolve(result) 
        }) 
    });
};

//check the authenticity of the authorization
const autorisationCheck = async (req, res) => {
    return await getTableRecord(`SELECT userid FROM users WHERE token = '${clienttoken(req, res)}'`)
    .then((user) => { 
        return (user.err || user == '') ? false : user[0].userid; 
    });
};

//logout
const logOut = (req, res) => {
    addCookies(req, res, '', '-1');
    res.redirect('/'); 
};

module.exports = {
    translit,
    token,
    log,
    clienttoken,
    addCookies,
    readyFullDate,
    checOnTrueVal,
    accessLog,
    getTableRecord,
    logOut,
    autorisationCheck
}