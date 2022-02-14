const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    return res.json({
        posts: {
            title: 'my first post',
            description: ' random data u shouldn\'t access without being logged in'
        }
    })
});

module.exports = router;