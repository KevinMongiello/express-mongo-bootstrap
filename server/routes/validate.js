const Joi = require('joi');
const User = require('../model/User');

// Register
const registerSchema = Joi.object({
    name: Joi.string().alphanum().min(2).max(255).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(1024).required(),
});

const registerValidation = (data) => {
    return registerSchema.validate(data);
}

// Login
const loginSchema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(1024).required(),
});

const loginValidation = data => loginSchema.validate(data);

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;