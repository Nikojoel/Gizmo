'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

// get one user
const getUser = async (params) => {
    try{
        const [rows] = await promisePool.execute('SELECT * FROM user WHERE user_id = ?',
            params,
        );
        delete rows[0].user_email;
        delete rows[0].user_password;
        return rows;
    } catch (e) {
        return {error: 'db error'}
    }
};

// add a user into db
const addUser = async (params) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO user (user_name, user_email, user_firstname, user_lastname, user_password, user_role, user_picture)  VALUES (?, ?, ?, ?, ?, ?, ?)',
            params,
        );
        return rows;
    } catch (e) {
        return {error: 'failed to add to db'};
    }
};

// get user based of email
const getUserLogin = async (params) => {
    try {
        const [rows] = await promisePool.execute(
            'SELECT * FROM user WHERE user_email = ?;',
            params);
        return rows;
    } catch (e) {
        console.log('error', e.message);
    }
};

// update user profile
const updateProfile = async (params) => {
    try {
        const [rows] = promisePool.execute(
            'UPDATE user SET user_name = ?, user_bio= ?, user_picture = ? WHERE user_id = ?',
            params);
            return rows;
        } catch (e) {
            return {error: 'db error'};
    }
};

// ban user
const banUser = async (params) => {
    console.log(params);
    try {
        const [rows] = promisePool.execute(
            'UPDATE user SET user_name = ?, user_role = ? WHERE user_id = ?', params);
        return rows;
    } catch (e) {
        return {error: 'db error'};
    }
};

module.exports = {
    getUser,
    addUser,
    getUserLogin,
    updateProfile,
    banUser,
};