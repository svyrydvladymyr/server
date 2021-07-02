module.exports = (req, res, pageName, err = '') => {
    const DATA = require('./user').DATA;
    require('./user').clearDATA();
    if (err !== '') {        
        DATA.errors.SERVER_ERROR = 'SERVER ERROR: 500 (Internal Server Error)';
        console.log('SERVER ERROR:', err);
        res.status(500).render('main', { DATA });
    } else {
        if (req.url === '/' || pageName === undefined || pageName === 'main') { res.render('main', { DATA }) }; 
        if (req.url !== '/') { res.render(pageName, { DATA }) };

        // getUser(req, res, pageName)
        // .then(() => { log("DATA", DATA) })
        // .then(() => { res.render(pageName, { DATA }) });     
    };
};