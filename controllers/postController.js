'use strict';
const postModel = require('../models/postModel');

const get_all_post = async (req, res) => {
    const posts = await postModel.getAllPosts();
    await res.json(posts);
};

const get_post = async (req, res) => {
    const [post] = await postModel.getPost([req.params.id]);
    await res.json(post);
};

const add_post = async (req, res) => {
    const params = [
        req.user.user_id,
        req.body.post_title,
        req.body.post_text,
        req.file.filename,
    ];
    const response = await postModel.addPost(params);
    await res.json(response);
};

const get_liked = async (req, res) => {
    const response = await postModel.getLikedPosts([req.user.user_id]);
    await res.json(response);
};

module.exports = {
    get_all_post,
    get_post,
    add_post,
    get_liked,
};