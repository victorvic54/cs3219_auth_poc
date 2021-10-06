const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        try {
            const bearer = bearerHeader.split(' ');
            
            if (bearer[0] !== 'Bearer') {
                return res.status(401).send('Missing Bearer keyword');
            } else {
                const bearerToken = bearer[1];
                req.userData = jwt.verify(bearerToken, process.env.TOKEN_SECRET);
                return next();
            }
        } catch (err) {
            res.status(400).send('Invalid Token');
        }
    } else {
        return res.status(401).send('Access Denied');
    }
}

