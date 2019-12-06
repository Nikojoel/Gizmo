'use strict';
const postModel = require('../models/postModel');
const thumb = require('../utils/resize');

const get_all_post = async (req, res) => {
    const posts = await postModel.getAllPosts([req.params.search]);
    await res.json(posts);
};

const get_post = async (req, res) => {
    console.log('get post?',req);
    const post = await postModel.getPost([req.params.id]);
    await res.json(post);
};

const add_post = async (req, res) => {
    try {
        await thumb.makeThumbnail(
            req.file.path,
            'thumbnails/' + req.file.filename,
            {width: 300, height: 300}
        );
    } catch (e) {
        console.log('sharp error: ', e);
    }
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
const add_comment = async (req, res) => {
    const params = [
        req.user.user_id,
        req.body.post_id,
        req.body.comment
    ];
    const response = await  postModel.addComment(params);
    await res.json(response);
};
const vote = async (req, res) => {
  const params = [
      req.user.user_id,
      req.body.post_id,
      1
  ];
  const response = await postModel.vote(params);
  await res.json(response);
};

module.exports = {
    get_all_post,
    get_post,
    add_post,
    get_liked,
    add_comment,
    vote,
};