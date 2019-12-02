'use strict';
const userModel = require('../models/userModel');

const get_all_users = async (req, res) => {
    const users = await userModel.getAllUsers();
    await res.json(users);
};

const get_user = async (req, res) => {
    const user = await userModel.getUser([req.params.id]);
    await res.json(user[0]);
};

const add_user = async (req, res) => {
    console.log(req.body);
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


module.exports = {
    get_all_users,
    get_user,
    add_user,
};