const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images'); // désignation du fichier de destination des images ajoutées
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // suppression des espaces et remplace par '_' dans le nom du fichier original
        const extension = MIME_TYPES[file.mimetype]; // création de l'extension sur fichier
        callback(null, name + Date.now() + '.' + extension); // on appelle la fonction pour renommer entièrement le fichier image nom, date et extension
    }
});

module.exports = multer({storage: storage}).single('image'); // exporation de l'élément multer