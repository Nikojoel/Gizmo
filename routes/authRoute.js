'use strict';
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const authController = require('../controllers/authController');

router.post('/register',
    [
        body('username', 'minimum 3 characters').isLength({min: 3}),
        body('email', 'email is not valid').isEmail(),
        body('firstname', 'not a valid name').matches('(/^[A-Za-z\\s]+$/)'),
        body('lastname', 'not a valid lastname').matches('(/^[A-Za-z\\s]+$/)'),
        body('password', 'at least one upper case letter').matches('(?=.*[A-Z]).{8,}'),
        sanitizeBody('name').escape(),
    ],
   authController.user_register,
   // authController.login,
);

module.exports = router;