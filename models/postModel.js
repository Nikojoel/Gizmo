'use strict';
const pool = require('../database/db.js');
const promisePool = pool.promise();

const getAllPosts = async (params) => {
    try {
        if (params == 'top') {
            const [rows] = await promisePool.execute(
                'SELECT post_id, post_title, post_file, ' +
                '(SELECT COUNT(*) FROM comment WHERE comment_post_id = post_id) AS count_comments, ' +
                '(SELECT COUNT(*) FROM vote WHERE vote_post_id = post_id AND vote_status = 1) AS count_vote, ' +
                'user_name , user_id , user_picture ' +
                'FROM post JOIN user ON ' +
                'post_owner = user_id ' +
                'ORDER BY count_vote DESC'
            );
            return rows;
        } else if (params == 'new'){
            const [rows] = await promisePool.execute(
                'SELECT post_id, post_title, post_file, ' +
                '(SELECT COUNT(*) FROM comment WHERE comment_post_id = post_id) AS count_comments, ' +
                '(SELECT COUNT(*) FROM vote WHERE vote_post_id = post_id AND vote_status = 1) AS count_vote, ' +
                'user_name , user_id , user_picture ' +
                'FROM post JOIN user ON ' +
                'post_owner = user_id ' +
                'ORDER BY post_date DESC'
            );
            return rows;
        } else if (params == 'trending'){
            const [rows] = await promisePool.execute(
                'SELECT post.*, user.user_name, user.user_picture, \n' +
                '(SELECT COUNT(*) FROM comment WHERE comment_post_id = post_id) AS count_comments, \n' +
                '(SELECT COUNT(*) FROM vote WHERE vote_post_id = post_id AND vote_status = 1) \n' +
                'AS count_vote\n' +
                'FROM post\n' +
                'JOIN user ON user.user_id = post.post_owner\n' +
                'WHERE TIMESTAMPDIFF(DAY, post_date, CURDATE()) <= 30\n' +
                'ORDER BY count_vote DESC'
            );
            return rows;
        } else {
            const search = ['%' + params + '%','%' + params + '%'];
            console.log('searching?', search);
            const [rows] = await promisePool.execute(
            'SELECT * FROM post JOIN user ON post_owner = user_id WHERE post_title LIKE ? OR user_name LIKE ?', search
            );
            return rows;
        }

    } catch (e) {
        return {error: 'db error'}
    }
};

const getPost = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT post.*, user.user_name, user.user_picture, ' +
            '(SELECT COUNT(*) FROM comment WHERE comment_post_id = post_id) AS count_comments,' +
            '(SELECT COUNT(*) FROM vote WHERE vote_post_id = post_id AND vote_status = 1) AS count_vote ' +
            'FROM post ' +
            'JOIN user ON user.user_id = post.post_owner ' +
            'WHERE post.post_id = ?',
            params,
        );
        const [comments] = await promisePool.execute(
            'SELECT COMMENT.*, user.user_name, user.user_picture FROM comment ' +
            'JOIN user ON comment_owner_id = user_id WHERE comment_post_id = ?',
            params);
        return {post:rows, commets: comments};
    }  catch (e) {
        return {error: 'db error'};
    }
};

const addPost = async (params) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO post (post_owner, post_title, post_text, post_file, post_date)  VALUES (?, ?, ?, ?, curdate())',
            params,
        );
        return rows;
    } catch (e) {
        return {error: 'failed to add to db'};
    }
};

const getLikedPosts = async (params) => {
  try {
      const [rows] = await  promisePool.execute('SELECT vote.*, post.*, user_name, user_picture FROM vote ' +
          'JOIN post ON post_id = vote_post_id ' +
          'JOIN user ON post_owner = user_id ' +
          'WHERE vote_owner_id = ? AND vote_status = 1;', params);
      return rows;
  }  catch (e) {
      return {error: 'db error'};
  }
};
const addComment = async (params) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO comment (comment_owner_id, comment_post_id, comment_text) VALUES (?, ?, ?)',params);
        return rows;
    } catch (e) {
        return {error: 'failed to add to db'};
    }
};
const vote = async (params) => {
    console.log('voting params', params);
    try {
        const [rows] = await promisePool.execute(
            'INSERT INTO vote' +
            '(vote_owner_id, vote_post_id, vote_status)' +
            'VALUES (?, ?, ?)' +
            'ON DUPLICATE KEY UPDATE  vote_status = NOT vote_status', params);
        return rows;
    } catch (e) {
        return {error: 'db error'};
    }
};
const deletePost = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'DELETE FROM post WHERE post_id = ?;',
            params,
        );
        return rows;
    } catch (e) {
        console.log('error', e.message);
        return {error: 'error in database query'};
    }
};

module.exports = {
    getAllPosts,
    getPost,
    addPost,
    getLikedPosts,
    addComment,
    vote,
    deletePost,
};