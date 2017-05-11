let Contact = require('../models/contact');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBMN28F6Ef-4HFF_E4yzZDHXfBUDDGehCQ'
});

module.exports = (req, res) => {

    const latitudine = req.body.latitudine;
    const longitudine = req.body.longitudine;
    Contact.getAllContacts(function(err,contacts){
        if(err) throw err;
        contacts.map(contact => {
            let distanta = Math.sqrt((latitudine - contact.latitudine)**2 * 10**8 + (longitudine - contact.longitudine)**2 * 10**8)/ 10000;
            contact.distanta = distanta.toFixed(2);
            console.log(contact.distanta);
        });
        contacts.sort((a,b) => a.distance - b.distance);
    });




};

