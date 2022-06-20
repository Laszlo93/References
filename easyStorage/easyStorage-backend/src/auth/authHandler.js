const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');
const Token = require('../models/token.model');

module.exports.login = (req, res) => {
    const { username } = req.body;

    User.findOne({ username: username })
        .then(user => {
            if (user) {
                const validPassword = bcrypt.compare(req.body.password, user.password);

                validPassword
                    .then(response => {
                        if(response) {
                            const accessToken = jwt.sign({
                                _id: user._id,
                                username: user.username,
                                name: `${user.lastName} ${user.firstName}`,
                                isAdmin: user.isAdmin
                            }, config.access_token_secret_key, {
                                expiresIn: config.token_expiry
                            });
            
                            const refreshToken = jwt.sign({
                                user_id: user._id,
                                username: user.username,
                                name: `${user.lastName} ${user.firstName}`,
                                isAdmin: user.isAdmin
                            }, config.refresh_token_secret_key);
            
                            res.json({
                                accessToken,
                                refreshToken,
                                userData: {
                                    username: user.firstName,
                                    name: `${user.lastName} ${user.firstName}`,
                                    user_id: user._id,
                                    isAdmin: user.isAdmin
                                }                               
                            });
            
                            const newRefreshToken = new Token({
                                token: refreshToken
                            });
            
                            newRefreshToken.save();
                        } else {
                            res.status(401).json('Password is incorrect!')
                        }
                    })

            } else {
                res.status(401).json('Username is incorrect!');
            }
        });
}

module.exports.refresh = (req, res) => {
    const { token } = req.body;

    if (!token) {
        res.sendStatus(400);
    }

    Token.findOne({ token: token })
        .then(data => {
            if (data) {
                jwt.verify(token, config.refresh_token_secret_key, (err, user) => {
                    if (err) {
                        res.sendStatus(404);
                        return;
                    }

                    console.log(user);

                    const accessToken = jwt.sign({
                        user_id: user.user_id,
                        username: user.username,
                        isAdmin: user.isAdmin
                    }, config.access_token_secret_key, {
                        expiresIn: config.token_expiry
                    });

                    res.json({
                        accessToken,
                        userData: {
                            user_id: user.user_id,
                            username: user.username,
                            name: user.name,
                            isAdmin: user.isAdmin
                        }
                    })
                });
            }
        });
}

module.exports.logout = (req, res) => {
    const { token } = req.body;

    if(!token) {
        res.sendStatus(400);
        return;
    }

    Token.findOneAndDelete({ token: token })
        .then(data => {
            if(data) {
                res.status(200).json({});
            } else {
                res.sendStatus(403);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json('Could not logout user!');
        })
}