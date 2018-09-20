require('dotenv').config();
var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'), //logging
    session = require('express-session'),
    dbConnection = require('./api/database'),
    MongoStore = require('connect-mongo')(session),
    passport = require('./api/passport'),
    app = express(),
    port = process.env.PORT || 8080;
    // mongoose = require('mongoose'),
    // Poem = require('./api/models/PoemModel');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    session({
        secret: process.env.SECRET,
        store: new MongoStore({ mongooseConnection: dbConnection }),
        resave: false,
        saveUninitialized: false
    })
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

var routes = require('./api/routes/Routes');
routes(app);

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('RESTful API server started on: ' + port);
