const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    nume: String,
    telefon: String,
    email: String,
    adresa: String,
    latitudine: Number,
    longitudine: Number
});

const Contact = module.exports = mongoose.model('Contact', ContactSchema);

module.exports.getAllContacts = function(callback){
    Contact.find(callback);
};

module.exports.newContact = function(newContact, callback){
    newContact.save(callback);
};