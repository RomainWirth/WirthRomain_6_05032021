const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

router.get('/', auth, stuffCtrl.getAllSauces); // trouver toutes les sauces
router.get('/:id', auth, stuffCtrl.getOneSauce); // trouver une sauce en particulier
router.post('/', auth, stuffCtrl.createSauce); // nouvelle sauce 
router.put('/:id', auth, stuffCtrl.modifySauce); // modifier une sauce
router.delete('/:id', auth, stuffCtrl.deleteSauce); // supprimer une sauce

module.exports = router;