'use strict';
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const passport = require('../utils/pass');

router.post('/', passport.authenticate('jwt', {session: false}), adminController.getPortal);

module.exports = router;