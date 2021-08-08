const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauces'); 
const auth = require('../middleware/auth'); // appel du middleware d'authentification : sécurisation des routes
const multer = require('../middleware/multer-config'); // appel du middleware pour le traitement des fichiers image

router.post('/', auth, multer, sauceCtrl.createSauce); // nouvelle sauce 
router.get('/', auth, sauceCtrl.getAllSauces); // trouver toutes les sauces
router.get('/:id', auth, sauceCtrl.getOneSauce); // trouver une sauce en particulier
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // modifier une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce); // supprimer une sauce
router.post('/:id/like', auth, sauceCtrl.likeSauce); // définit le statut like

module.exports = router;