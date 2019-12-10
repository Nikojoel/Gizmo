'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../utils/pass');

// get one user by id
router.get('/:id', userController.get_user);

// get users own profile
router.post('/profile', passport.authenticate('jwt', {session: false}), userController.get_profile);

// ban user
router.put('/:id', passport.authenticate('jwt', {session: false}), userController.ban_user);

module.exports = router;
