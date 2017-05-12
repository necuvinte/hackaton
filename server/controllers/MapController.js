let Contact = require('../models/contact');
const distance = require('google-distance');

module.exports = (req, res) => {

    console.log(req);
    Contact.getAllContacts(function(err,contacts){
        if(err) throw err;

        contacts.map(contact => {
            let distanta = Math.sqrt((req.query.latitudine - contact.latitudine)**2 * 10**8 + (req.query.longitudine - contact.longitudine)**2 * 10**8)/ 10000;
            contact.distanta = distanta.toFixed(2);
        });

        contacts.sort((a,b) => a.distanta - b.distanta);

        if(contacts.length > 10){
            contacts = contacts.slice(0,10);
        }

        let adrese = contacts.map(contact => contact.latitudine + ',' + contact.longitudine);

        distance.get(
            {
                origin: req.query.latitudine + ',' + req.query.longitudine,
                destinations: adrese
            },
            function(err, data) {
                if (err) return console.log(err);
                console.log(data);
                contacts.forEach(function(contact, index, contacts){
                    contact.distanta = data[index].distance;
                    contact.durata = data[index].durationValue;
                    contacts[index] = contact;

                });
                contacts.sort((a,b) => parseInt(a.durata) - parseInt(b.durata));
                contacts.forEach(contact => console.log(contact.durata));
                console.log(contacts);
                res.render('results', {contacts: contacts});
            });
    });




};

