let Contact = require('../models/contact');

module.exports.createContact = (req, res) => {
    const nume = req.body.nume;
    const telefon = req.body.telefon;
    const email = req.body.email;
    const adresa = req.body.adresa;
    const latitudine = req.body.latitudine;
    const longitudine = req.body.longitudine;

    //TODO script to collect latitude/longitude from address

    req.checkBody('nume', 'Name field is required').notEmpty();
    req.checkBody('telefon', 'Phone field is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('adresa', 'Address field is required').notEmpty();
    req.checkBody('latitudine', 'Location field is required').notEmpty();
    req.checkBody('longitudine', 'Location field is required').notEmpty();

    const errors = req.validationErrors();

    if(errors){
        console.log({ errors: errors });
    } else {
        let newContact = new Contact({
            nume: nume,
            telefon: telefon,
            email: email,
            adresa: adresa,
            latitudine: latitudine,
            longitudine: longitudine
        });

        Contact.newContact(newContact, function(err, contact) {
            if(err) throw err;
            console.log(contact);
        })
    }

}