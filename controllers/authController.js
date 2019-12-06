'use strict';
const passport = require('passport');
const jwt = require('jsonwebtoken');
const thumb = require('../utils/resize');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({user, token});
        });
    })(req, res);
};

const user_register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {
        try {
            await thumb.makeThumbnail(
                req.file.path,
                'thumbnails/' + req.file.filename,
                {width: 300, height: 300}
            );
        } catch (e) {
            console.log('sharp error: ', e);
        }
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const params = [
            req.body.username,
            req.body.email,
            req.body.firstname,
            req.body.lastname,
            hash,
            2,
            req.file.filename,
        ];
        if (await userModel.addUser(params)) {
            params[4] = "";
            await res.json(params);
            next();
        } else {
            res.status(400).json({error: 'register error'});
        }
    }
};
const update_profile = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {
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
            req.body.username,
            req.body.bio,
            req.file.filename,
            req.user.user_id,
        ];
        if (await userModel.updateProfile(params)) {
            await res.json(params);
            next();
        } else {
            res.status(400).json({error: 'register error'});
        }
    }
};

const logout = (req, res) => {
    req.logout();
    res.json({message: 'logout'});
};

module.exports = {
    user_register,
    logout,
    login,
    update_profile,
};