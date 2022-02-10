const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log('verified: ', verified);
        req.user = verified;
        next();
    } catch (err) {
        console.log('error: ', err);
        res.status(400).send('Invalid Token');
    }
}