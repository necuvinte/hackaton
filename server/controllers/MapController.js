let Contact = require('../models/contact');
const distance = require('google-distance');

module.exports = (req, res) => {

    console.log(req.body.latitudine);
    Contact.getAllContacts(function(err,contacts){
        if(err) throw err;
        contacts.map(contact => {
            let distanta = Math.sqrt((req.body.latitudine - contact.latitudine)**2 * 10**8 + (req.body.longitudine - contact.longitudine)**2 * 10**8)/ 10000;
            contact.distanta = distanta.toFixed(2);
        });
        contacts.sort((a,b) => a.distanta - b.distanta);
        //contacts.forEach(contact => console.log(contact.distanta));
        if(contacts.length > 10){
            contacts = contacts.slice
        }
        let adrese = contacts.map(contact => contact.latitudine + ',' + contact.longitudine);
        //console.log(adrese);

        distance.get(
            {
                origin: req.body.latitudine + ',' + req.body.longitudine,
                destinations: adrese
            },
            function(err, data) {
                if (err) return console.log(err);
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

