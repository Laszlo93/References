module.exports = (req, res, next) => {
    if(req.user.isAdmin === false) {
        return res.sendStatus(401);
    }

    next();
}