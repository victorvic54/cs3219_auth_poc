const router = require('express').Router();
const verify = require('./verifyToken');
const permission = require('./permissionToken');

router.get('/', [verify, permission("2")], (req, res) => {
    res.json({
        message: {
            title: 'Only Admin can access this',
            description: 'You are accessing forbidden data'
        }
    });
});

module.exports = router;