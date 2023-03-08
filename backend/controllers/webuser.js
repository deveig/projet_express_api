const User = require('../models/user');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const jsonWebToken = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const  randomKey = process.env.RANDOM_KEY;

/* Create a user account and hashes the password */
exports.signup = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.validate()
        .then(() => {
            bcrypt.hash(req.body.password, 10)
                .then(passwordHash => {
                    user.password = passwordHash;
                    user.save({ validateBeforeSave: false })
                        .then(() => { 
                            res.status(201).json({ message: 'Your account is created !' });
                        })
                        .catch((error) => {
                            res.status(500).json({ error });
                        });
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error });
            }
        });
}

/* Check the user's email and password and return the user's id and a token */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'Your email or password is invalid !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Your email or password is invalid !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jsonWebToken.sign(
                            { userId: user._id },
                            randomKey,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch((error) => { 
                    res.status(500).json({ error });
                });
        })
        .catch((error) => { 
            if (error instanceof mongoose.Error.CastError) {
                res.status(400).json({ error: 'Invalid syntax' });
            } else {
                res.status(500).json({ error });
            }
        });
}