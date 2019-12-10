'use strict';
const express = require('express');
const router = express.Router();
const {body, sanitizeBody} = require('express-validator');
const authController = require('../controllers/authController');
const multer = require('multer');
const imageFilter = require('../utils/multer');
const upload = multer ({dest:'uploads/', fileFilter: imageFilter.imageFilter});
const passport = require('../utils/pass')

// path to user login
router.post('/login', authController.login);

// path to logout
router.get('/logout' , authController.logout);

// path to user registration with validation
router.post('/register',upload.single('profile'),[
    body('username', 'minimum 3 characters').isLength({min: 3}),
    body('email', 'email is not valid').isEmail().isLength({min: 5}),
    body('firstname', 'not a valid name').matches('([A-Za-z])').isLength({min:2, max: 20}),
    body('lastname', 'not a valid lastname').matches('([A-Za-z])').isLength({min:2, max: 20}),
    body('password', 'at least one upper case letter').matches('(?=.*[A-Z]).{8,}'),
    sanitizeBody('name').escape(),
], authController.user_register);

// path to update userdata
router.put('/update', upload.single('profile'),
    passport.authenticate('jwt', {session: false}),
    [body('username', 'minimum 3 characters').isLength({min: 3})
], authController.update_profile);
   // authController.login,


module.exports = router;

