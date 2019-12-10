'use strict';
const userModel = require('../models/userModel');

// get one user
const get_user = async (req, res) => {
    const user = await userModel.getUser([req.params.id]);
    await res.json(user[0]);
};

// add one user
const add_user = async (req, res) => {
      const params = [
          req.body.name,
          req.body.firstname,
          req.body.lastname,
          req.body.password,
          2,
      ];
      const response = await userModel.addUser(params);
      await res.json(response);
};

// get users own profile
const get_profile = async (req, res) => {
    const [user] = await userModel.getUser([req.user.user_id]);
    await res.json(user);
};

// ban a user
const ban_user = async (req, res) => {
    if (req.user.user_role === 1) {
        const params = [
            'BANNED' ,
            3,
            req.params.id,
        ];
        const response = await userModel.banUser(params);
        await  res.json(response);
    } else {
        res.send('Unauthorized access');
    }
};

module.exports = {
    get_user,
    add_user,
    get_profile,
    ban_user,
};