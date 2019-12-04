'use strict';
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const authController = require('../controllers/authController');
const multer = require('multer');
const upload = multer ({dest:'uploads/'});

router.post('/login', authController.login);
router.get('/logout' , authController.logout);
router.post('/register',upload.single('profile'),[
    body('username', 'minimum 3 characters').isLength({min: 3}),
    body('email', 'email is not valid').isEmail(),
    body('firstname', 'not a valid name').matches('([A-Za-z])'),
    body('lastname', 'not a valid lastname').matches('([A-Za-z])'),
    body('password', 'at least one upper case letter').matches('(?=.*[A-Z]).{8,}'),
    sanitizeBody('name').escape(),
], authController.user_register);
router.put('/update', upload.single('profile'), [
    body('username', 'minimum 3 characters').isLength({min: 3})
]);
   // authController.login,


module.exports = router;

