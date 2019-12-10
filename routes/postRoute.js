'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const imageFilter = require('../utils/multer');
const upload = multer({dest: 'uploads/', fileFilter: imageFilter.imageFilter});
const postController = require('../controllers/postController');
const passport = require('../utils/pass');

// path for getting list of posts by search parameter
router.get('/search/:search', postController.get_all_post);

// get one post
router.get('/:id', postController.get_post);

// upload new post
router.post('/', passport.authenticate('jwt', {session: false}),upload.single('post_file'), postController.add_post);

// get list of liked posts by user
router.post('/liked', passport.authenticate('jwt', {session: false}) ,postController.get_liked);

// add a comment to a post
router.post('/comment', passport.authenticate('jwt', {session: false}) , postController.add_comment);

// vote for a post
router.post('/vote', passport.authenticate('jwt', {session: false}), postController.vote);

// delete a post
router.delete('/:id',  passport.authenticate('jwt', {session: false}), postController.delete_post);

module.exports = router;