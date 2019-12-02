'use strict';
const pool = require('../database/db.js');
const promisePool = pool.promise();

const getAllPosts = async () => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT post_title, post_file, COUNT(comment_post_id) as count_comments, COUNT(vote_post_id) as count_vote, ' +
            'user_name , user_id , user_picture ' +
            'FROM post JOIN user ON ' +
            'post_owner = user_id ' +
            'JOIN comment ON post_id = comment_post_id ' +
            'JOIN vote ON post_id = vote_post_id ' +
            'group by comment_post_id;'

            );
        return rows;
    } catch (e) {
        return {error: 'db error'}
    }
};

const getPost = async (params) => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM post WHERE post_id = ?',
            params,
        );
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

module.exports = {
    getAllPosts,
    getPost,
    addPost,
};