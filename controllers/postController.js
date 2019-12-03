'use strict';
const postModel = require('../models/postModel');

const get_all_post = async (req, res) => {
    const posts = await postModel.getAllPosts();
    await res.json(posts);
};

const get_post = async (req, res) => {
    const [post] = await postModel.getPost([req.params.id]);
    console.log(req.user);
    await res.json(post);
};

const add_post = async (req, res) => {
    const params = [
        req.body.post_owner,
        req.body.post_title,
        req.body.post_text,
        req.file.filename,
    ];
    const response = await postModel.addPost(params);
    await res.json(response);
};


module.exports = {
    get_all_post,
    get_post,
    add_post,
};