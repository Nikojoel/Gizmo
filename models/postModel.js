'use strict';
const pool = require('../database/db.js');
const promisePool = pool.promise();

const getAllPosts = async () => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT post_id, post_title, post_file, ' +
            '(SELECT COUNT(*) FROM comment WHERE comment_post_id = post_id) AS count_comments, ' +
            '(SELECT COUNT(*) FROM vote WHERE vote_post_id = post_id) AS count_vote, ' +
            'user_name , user_id , user_picture ' +
            'FROM post JOIN user ON ' +
            'post_owner = user_id '
            );
        return rows;
    } catch (e) {
        return {error: 'db error'}
    }
};

const getPost = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT post.*, user.user_name, user.user_picture, ' +
            '(SELECT COUNT(*) FROM comment WHERE comment_post_id = post_id) AS count_comments,' +
            '(SELECT COUNT(*) FROM vote WHERE vote_post_id = post_id) AS count_vote ' +
            'FROM post ' +
            'JOIN user ON user.user_id = post.post_owner ' +
            'WHERE post.post_id = ?',
            params,
        );

        return rows;
    }  catch (e) {
        return {error: 'db error'};
    }
};

const addPost = async (params) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO post (post_owner, post_title, post_text, post_file)  VALUES (?, ?, ?, ?)',
            params,
        );
        return rows;
    } catch (e) {
        return {error: 'failed to add to db'};
    }
};

const getLikedPosts = async (params) => {
    console.log(params);
  try {
      const [rows] = await  promisePool.execute('SELECT vote.*, post.*, user_name, user_picture FROM vote ' +
          'JOIN post ON post_id = vote_post_id ' +
          'JOIN user ON post_owner = user_id ' +
          'WHERE vote_owner_id = ?;', params);
      return rows;
  }  catch (e) {
      return {error: 'db error'};
  }
};

module.exports = {
    getAllPosts,
    getPost,
    addPost,
    getLikedPosts,
};