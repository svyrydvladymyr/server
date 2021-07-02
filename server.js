const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const {users, userssettings} = require('./db/createDB');
const {log, logOut, accessLog} = require('./modules/service');
const renderPage = require('./modules/renderPage');

//oaugh
require('./modules/oaugh.js')(app);

//template engineer
app.set('views', __dirname + '/templates'); 
app.set('view engine', 'ejs');

//static files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//console logs
app.use((req, res, next) => {log(`URL-REQUEST:-(${req.method})-`, req.url); next();});

//system logs
app.use((req, res, next) => {accessLog(req, res, next)});


// app.post('/settingsproba', (req, res) => {renderPage(req, res, 'settings')});

//logout
app.post('/exit', (req, res) => {logOut(req, res)});

//pages
// app.get('/profile', (req, res) => {renderPage(req, res, 'profile')});
// app.get('/settings', (req, res) => {renderPage(req, res, 'settings')});
app.get('/', (req, res) => {renderPage(req, res)});
app.get('*', (req, res) => {res.status(404).send(require('./config/404'));});

//server listen
app.listen(process.env.PORT || 4000, () => {console.log('Server is running...')});