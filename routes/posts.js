const router = require('express').Router();
const { useJwt } = require('./verifyToken');

router.get('/', useJwt, (req, res) => {
    return res.json({
        posts: [{
            title: 'my first post',
            description: ' random data u shouldn\'t access without being logged in'
        }]
    })
});

module.exports = router;