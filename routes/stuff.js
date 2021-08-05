const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createSauce); // nouvelle sauce 
router.get('/', auth, stuffCtrl.getAllSauces); // trouver toutes les sauces
router.get('/:id', auth, stuffCtrl.getOneSauce); // trouver une sauce en particulier
router.put('/:id', auth, multer, stuffCtrl.modifySauce); // modifier une sauce
router.delete('/:id', auth, stuffCtrl.deleteSauce); // supprimer une sauce
// router.post('/:id/like', auth, stuffCtrl.likeSauce); // définit le statut like

module.exports = router;