const Sauce = require('../models/Sauce');

// fonction récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json({ sauces }))
    .catch(error => res.status(404).json({ error }));
};

// fonction récupérer une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json({ product }))
    .catch(error => res.status(400).json({ error }));
};

// fonction créer sauce
exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
        sauce: req.body.name,
        image: req.body.imageUrl
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'sauce ajoutée' }))
    .catch(error => res.status(400).json({ error }));
};

// fonction modifier sauce
exports.modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'sauce modifiée' }))
    .catch(error => res.status(400).json({ error }));
};

// fonction supprimer sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'sauce supprimée' }))
    .catch(error => res.status(400).json({ error }));
};

// fonction créer le statut like sur une sauce
// exports.likeSauce = (req, res, next) => {
//     const like = new Like({
//     });
//     Sauce.save()
//     .then()
//     .catch(error => res.status(400).json ({ error }));
// }