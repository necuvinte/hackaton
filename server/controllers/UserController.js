const User = require('../models/user');

module.exports.logout = function(req, res) {
    req.logOut();
    res.sendStatus(200);
};

module.exports.loggedIn = function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
};

//Should query the db for existing name and if not it should store the request with an encrypted pass
module.exports.signUp = function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (user) {
            res.json(null);
            return;
        } else {
            let newUser = new User();
            newUser.username = req.body.username.toLowerCase();
            newUser.password = newUser.generateHash(req.body.password);
            newUser.save(function(err, user) {
                req.login(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    res.json(user);
                });
            });
        }
    });
};