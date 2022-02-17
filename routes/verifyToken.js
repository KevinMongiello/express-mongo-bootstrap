require('dotenv').config();
const jwt = require('express-jwt');

module.exports.useJwt = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    getToken: req => req.cookies.token })