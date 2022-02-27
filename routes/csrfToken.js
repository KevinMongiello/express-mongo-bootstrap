const router = require('express').Router();

router.get('/api/csrf', (req, res) => {
    const token = req.csrfToken();
    res.send({ csrfToken: token });
});

module.exports = router;