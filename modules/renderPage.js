const {addCookies} = require('./service');

const DATA = {
    errors : {
        errMessage : '',
        SERVER_ERROR : ''
    },
    permission : {  }
};

const clearDATA = () => {

};


const renderPage = (req, res, pageName = 'main', err = '') => {
    clearDATA();
    if (err !== '') {        
        DATA.errors.SERVER_ERROR = `SERVER ERROR: ${err}`;
        res.render(pageName, { DATA }); 
    } else {
        if (pageName === 'exit') {
            addCookies(req, res, '', '-1');
            res.redirect('/'); 
        } else {           
            // getUser(req, res, pageName)
            // .then(() => { log("DATA", DATA) })
            // .then(() => { res.render(pageName, { DATA }) });

            res.render(pageName, { DATA })
        };   
    };
};

module.exports = {
    renderPage
};