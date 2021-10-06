const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        message: {
            title: 'You got access to my data: ' + req.userData.username,
            description: 'You are authenticated'
        }
    });
});

module.exports = router;