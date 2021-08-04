const express = require('express'); // importation d'express
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sauce = require('./models/Sauce');

let db_name = "WirthRomain_6_05032021";
let db_user = "RomWIR";
let db_pwd = "OpenCR_RW_P6";

mongoose.connect('mongodb+srv://' + db_user + ':' + db_pwd + '@cluster0.kjtph.mongodb.net/' + db_name + '?retryWrites=true&w=majority',
    { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie (' + db_name + ') - ' + Date.now() ))
    .catch((mongo_error) => console.log('Connexion à MongoDB échouée !\n' + mongo_error));

const app = express(); // const app = application

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

// nouvelle sauce 
app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        sauce: req.body.name,
        image: req.body.imageUrl
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'sauce ajoutée' }))
    .catch(error => res.status(400).json({ error }));
});

// trouver toutes les sauces
app.get('/api/sauces/', (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json({ sauces }))
    .catch(error => res.status(404).json({ error }));
});

// trouver une sauce en particulier
app.get('/api/sauces/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error }));
});

// modifier une sauce
app.put('api/sauces/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'modifié' }))
    .catch(error => res.status(400).json({ error }));
});

// supprimer une sauce
app.delete('api/sauces/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'sauce supprimée' }))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app; // exportation de l'application pour y accéder depuis les autres fichiers du projet