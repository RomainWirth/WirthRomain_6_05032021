const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); // requête post pour s'enregistrer
router.post('/login', userCtrl.login); // requête post pour se 'log'

module.exports = router;