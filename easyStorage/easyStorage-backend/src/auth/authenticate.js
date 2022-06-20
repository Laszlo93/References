const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(authHeader) {
        // Bearer sdkljfklsdéjfklésdjfklésd
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.access_token_secret_key, (err, user) => {
            if(err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}