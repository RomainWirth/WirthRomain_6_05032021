const mongoose = require ('mongoose'); // librairie JavaScript de MongoDB
const uniqueValidator = require('mongoose-unique-validator'); // plugin permet d'empêcher l'utilisation de la même adresse mail plusieurs fois

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true }, // unique : true permet d'empêcher l'utilisation de la même adresse mail plusieurs fois
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // appel de la const uniqueValidator

module.exports = mongoose.model('User', userSchema);