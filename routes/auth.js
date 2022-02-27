const router = require('express').Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('./validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    // Validate data 
    const { error, value } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check for duplicate Email
    const emailExists = await User.findOne({ email: req.body.email }).exec();
    if (emailExists) return res.status(400).send('Email already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({ ...value, password: hashedPassword });
    try {
        const savedUser = await user.save();
        res.send({ id: savedUser._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login',  async (req, res) => {
    // Validate Form
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Fetch User
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) return res.status(400).send('Email or Password is incorrect');

    // Validate Password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    // Create and assign token
    const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET);

    res.cookie('token', token, { httpOnly: true, sameSite: true }).send({ token });
});

router.get('/logout', (req, res) => {
    res.cookie('token').status(200).send('success');
})

router.get('/jwt', (req, res) => {
    const token = req.cookies.token;
    
    if (token && token !== 'undefined') {
        res.send({ token: token });
    } else {
        res.send();
    }
})

module.exports = router;