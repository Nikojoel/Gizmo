'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageFilter = require('../utils/multer');
const upload = multer({dest: 'uploads/', fileFilter: imageFilter.imageFilter});
const postController = require('../controllers/postController');
const passport = require('../utils/pass');

router.get('/search/:search', postController.get_all_post);

router.get('/:id', postController.get_post);

router.post('/', passport.authenticate('jwt', {session: false}),upload.single('post_file'), postController.add_post);

router.post('/liked', passport.authenticate('jwt', {session: false}) ,postController.get_liked);

router.post('/comment', passport.authenticate('jwt', {session: false}) , postController.add_comment);

router.post('/vote', passport.authenticate('jwt', {session: false}), postController.vote);

router.delete('/:id',  passport.authenticate('jwt', {session: false}), postController.delete_post);

module.exports = router;