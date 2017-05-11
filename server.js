const express = require('express');
const path = require('path');
let app = express();


// const db = require('./config/db');
// mongoose.connect(db.url);

app.set('port', (process.env.PORT || 5000));

app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
let public = __dirname + '/public/';

require('./server/routes')(app, public);

app.listen(app.get('port'), () => {
    console.log('App is running on port', app.get('port'));
});

exports = module.exports = app;