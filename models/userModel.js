'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
    try {
        const [rows] = await promisePool.execute('SELECT * FROM user');
        return rows;
    } catch (e) {
        return {error: 'db error'}
    }
};

const getUser = async (params) => {
    console.log('params?', params);
    try{
        const [rows] = await promisePool.execute('SELECT * FROM user WHERE user_id = ?',
            params,
        );
        delete rows[0].user_password;
        return rows;
    } catch (e) {
        return {error: 'db error'}
    }
};

const addUser = async (params) => {
    console.log(params);
    try {
        const [rows] = await promisePool.execute('INSERT INTO user (user_name, user_email, user_firstname, user_lastname, user_password, user_role, user_picture)  VALUES (?, ?, ?, ?, ?, ?, ?)',
            params,
        );
        return rows;
    } catch (e) {
        return {error: 'failed to add to db'};
    }
};
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
module.exports = {
    getAllUsers,
    getUser,
    addUser,
    getUserLogin,
    updateProfile,
};