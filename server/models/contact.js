const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    JUDET: String,
    TELEFON: String,
    EMAIL: String,
    ADRESA: String,
    SERVICII: String
});

const Contact = module.exports = mongoose.model('Contact', ContactSchema);

module.exports.getAllContacts = function(callback){
    Contact.find(callback);
};

module.exports.newContact = function(newContact, callback){
    newContact.save(callback);
};

