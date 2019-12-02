'use strict';
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const postController = require('../controllers/postController');

router.get('/', postController.get_all_post);

router.get('/:id', postController.get_post);

router.post('/', upload.single('upload'), postController.add_post);

//router.put('/', postController.update_post);

//router.delete('/:id', postController.delete_post);

module.exports = router;