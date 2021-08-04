const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.get('/', stuffCtrl.getAllSauces); // trouver toutes les sauces
router.get('/:id', stuffCtrl.getOneSauce); // trouver une sauce en particulier
router.post('/', stuffCtrl.createSauce); // nouvelle sauce 
router.put('/:id', stuffCtrl.modifySauce); // modifier une sauce
router.delete('/:id', stuffCtrl.deleteSauce); // supprimer une sauce

module.exports = router;