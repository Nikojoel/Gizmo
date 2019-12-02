'use strict';
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const authController = require('../controllers/authController');
const multer = require('multer');
const upload = multer ({dest:'uploads/'});

router.post('/register',upload.single('profile'), authController.user_register);
   // authController.login,


module.exports = router;

/*[
        body('username', 'minimum 3 characters').isLength({min: 3}),
        body('email', 'email is not valid').isEmail(),
        body('firstname', 'not a valid name').matches('([A-Za-z])'),
        body('lastname', 'not a valid lastname').matches('([A-Za-z])'),
        body('password', 'at least one upper case letter').matches('(?=.*[A-Z]).{8,}'),
        sanitizeBody('name').escape(),

    ],*/