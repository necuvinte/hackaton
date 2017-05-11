const mapController = require('./controllers/MapController');
const contactController = require('./controllers/ContactController');

module.exports = function(app, public) {

    app.post('/location', mapController);

    app.post('/admin/create', contactController.createContact);

    app.get('/', (req, res) => {
        res.render("index");
    });

    app.get('/admin', (req,res) => {
        res.sendFile(public + 'admin.html');
    })
};