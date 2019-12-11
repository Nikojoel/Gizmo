'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local passport strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
        const params = [username];
        try {
            const [user] = await userModel.getUserLogin(params);
            if (user === undefined) {
                return done(null, false, {message: 'Incorrect credential.'});
            }
            if (user.user_role === 3) {
                return done(null, false, {message: 'user banned'});
            }
            if (!bcrypt.compareSync(password, user.user_password)) {
                return done(null, false, {message: 'Incorrect credential.'});
            }
            delete user.user_email;
            delete user.user_password;
            return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    }));

// jwt strategy
passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET

    },(jwtPayload, done) => {done(null, jwtPayload);}
));

module.exports = passport;