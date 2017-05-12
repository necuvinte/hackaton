const express = require('express');
const path = require('path');
let app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
require('./config/passport')(passport); // pass passport for configuration
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.use(session({
    secret: 'secret mare',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const db = require('./config/db');
mongoose.connect(db.url);
module.exports.User = require('./server/models/user');
module.exports.Contact = require('./server/models/contact');

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));

app.use(express.static(path.join(__dirname, 'public')));
let public = __dirname + '/public/';

require('./server/routes')(app, public, passport);

app.listen(app.get('port'), () => {
    console.log('App is running on port', app.get('port'));
});

exports = module.exports = app;