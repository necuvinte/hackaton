const mapController = require('./controllers/MapController');
const contactController = require('./controllers/ContactController');
const userController = require('./controllers/UserController');


module.exports = function(app, public, passport) {

    app.post('/location', mapController.returnLocations);


    //ADMIN ROUTES
    app.post("/login", passport.authenticate('local-login'), function(req, res) {
        res.json(req.user);
    });

    app.get('/invalid', mapController.returnInvalidLocations);

    // handle logout
    app.post("/logout", userController.logout);

    // loggedin
    app.get("/loggedin", userController.loggedIn);

    //signUp, TODO decide if kept enabled or disabled
    app.post("/signup", userController.signUp);

    app.post('/admin/create', contactController.createContact);

    //LANDING ROUTES
    app.get('/', (req, res) => {
        res.render("index");
    });

    app.get('/admin', (req,res) => {
        res.sendFile(public + 'admin.html');
    })
};