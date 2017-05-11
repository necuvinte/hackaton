

module.exports = function(app, public) {

    app.get('/', (req, res) => {
        res.render("index");
    });

    app.get('/admin', (req,res) => {
        res.sendFile(public + 'admin.html');
    })
};