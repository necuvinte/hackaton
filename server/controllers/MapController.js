let Contact = require('../models/contact');
const distance = require('google-distance');
distance.apiKey = 'AIzaSyAr5_xqb3-4Oyxyde0mG2Xq4cE-MciPLaM';

module.exports.returnLocations = (req, res) => {

    Contact.getAllContacts(function(err,contacts){
        if(err) throw err;

        let contacteValide = contacts.filter( contact => contact.ADRESA != '');

        let adrese = contacteValide.map( contact => contact.ADRESA);

        //console.log(adrese);

        //TODO remember to validate adresses on the admin interface

        //TODO keep the commented code, test for location errors
        //Strada Ady Endre 5, Târgu Secuiesc 525400 - Târgu Secuiesc, Str. Curtea 11, nr. 4, jud. Covasna
        //adresa gasita pe google/ adresa trecuta

        // adrese.forEach(adresa => {
        //     distance.get({
        //         origin: 'B-dul 1848, nr. 23, Hunedoara',
        //         destination: adresa
        //     }, function (err, data) {
        //         if(err) {
        //             console.log(adresa);
        //         }
        //
        //     })
        // });

        distance.get(
            {
                //origin: 'B-dul 1848, nr. 23, Hunedoara',
                origin: req.body.latitudine + ',' + req.body.longitudine,
                destinations: adrese
            },
            function(err, data) {
                if (err) return console.log(err);
                //console.log(data);
                contacteValide.forEach(function(contact, index){
                    contact.distanta = data[index].distance;
                    contact.durata = data[index].durationValue;
                    contacteValide[index] = contact;

                });
                contacteValide.sort((a,b) => parseInt(a.durata) - parseInt(b.durata));
                contacteValide.map(contact => console.log(contact.durata));
                //console.log(contacteValide);
                // if(contacteValide.length > 9){
                //     contacteValide = contacteValide.slice(0,10);
                // }
                res.send(contacteValide);
            });
    });




};

module.exports.returnInvalidLocations = function(req, res){
    Contact.getAllContacts(function (err, contacts) {
        let adreseInvalide = contacts.filter( contact => contact.ADRESA === '');
        res.send(adreseInvalide);
    })
};