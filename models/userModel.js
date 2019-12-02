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
    try{
        const [rows] = await promisePool.execute('SELECT * FROM user WHERE user_id = ?',
            params,
        );
        return rows;
    } catch (e) {
        return {error: 'db error'}
    }
};

const addUser = async (params) => {
    try {
        const [rows] = await promisePool.execute('INSERT INTO user (user_name, user_firstname, user_lastname, password, user_role)  VALUES (?, ?, ?, ?,?)',
            params,
        );
        return rows;
    } catch (e) {
        return {error: 'failed to add to db'};
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
};