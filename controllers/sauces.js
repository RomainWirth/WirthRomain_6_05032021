const Sauce = require('../models/Sauce');
const fs = require('fs');

// fonction créer sauce : POST
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
    .then(() => { res.status(201).json({ message: 'sauce ajoutée' }); })
    .catch(error => { res.status(400).json({ error }); });
};

// fonction récupérer toutes les sauces : GET
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauce => { res.status(200).json(sauce); })
    .catch(error => { res.status(404).json({ error }); });
};

// fonction récupérer une sauce : GET
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => { res.status(200).json(sauce); })
    .catch(error => { res.status(400).json({ error }); });
};

// fonction modifier sauce : PUT
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => { res.status(200).json({ message: 'sauce modifiée' }); })
    .catch(error => { res.status(400).json({ error }); });
};

// fonction supprimer sauce : DELETE
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id}) // on trouve la sauce dans la BDD
    .then(sauce => { // une fois trouvée
        const filename = sauce.imageUrl.split('/images/')[1]; // on extrait le nom du fichier à supprimer
        fs.unlink(`images/${filename}`, () => { // on supprime avec fs.unlink
            Sauce.deleteOne({ _id: req.params.id }) // ici on supprime le fichier de la BDD
            .then(() => { res.status(200).json({ message: 'sauce supprimée' }); })
            .catch(error => { res.status(400).json({ error }); });
        });
    })
    .catch(error => res.status(500).json({ error }));
};


// fonction créer le statut like sur une sauce : POST
exports.likeSauce = (req, res, next) => {
// 3 cas de figure au POST : 
// si like = 1 : alors l'utilisateur poste un like sur la sauce
// si like = -1 : alors l'utilisateur poste un dislike la sauce
// si like = 0 : alors l'utilisateur annule son like ou son dislike
console.log("requête body"); // console log s'affiche sur la console d'écoute port 3000
console.log(req.body); // vérification de id récupéré du body = userId
console.log("requête paramètres"); // console log s'affiche sur la console d'écoute port 3000
console.log(req.params); // vérification de id récupéré en paramètre = id de la sauce

    // si l'utilisateur n'a pas déjà "like" la sauce, il poste un like et on l'ajoute aux usersLiked
    if(req.body.like === 1){
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { likes: 1 }, // opérateurs mongoose
                $push: { usersLiked: req.body.userId }
            }
        )
        .then(() => { res.status(201).json({ message: "Evaluation ok" }); })
        .catch(error => { res.status(400).json ({ error }); });
    }

    // si l'utilisateur n'a pas déjà "dislike" la sauce, il poste un dislike et on l'ajoute aux usersdisLiked
    if(req.body.like === -1){
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId }
            }
        )
        .then(() => { res.status(201).json({ message: "Evaluation ok" }); })
        .catch(error => { res.status(400).json ({ error }); });
    }

    // deux cas de figure : si l'utilisateur a déjà "like" la sauce ou s'il a déjà "dislike" la sauce
    if(req.body.like === 0){
        Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            //si l'utilisateur a déjà like la sauce, suppression du like et du usersLiked
            if(sauce.usersLiked.find(user => user === req.body.userId)){
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                .then(() => { res.status(201).json({ message: "Evaluation ok" })})
                .catch(error => { res.status(400).json({ error }); });
            }
            //si l'utilisateur a déjà dislike la sauce, suppression du like et du usersLiked
            if(sauce.usersDisliked.find(user => user === req.body.userId)){
                Sauce.updateOne(
                    { _id: req.params.id },
                    {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId }
                    }
                )
                .then(() => { res.status(201).json({ message: "Evaluation ok" })})
                .catch(error => { res.status(400).json({ error }); });
            }
        })
        .catch(error => { res.status(400).json ({ error }); });
    }
};