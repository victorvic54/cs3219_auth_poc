const jwt = require('jsonwebtoken');

module.exports = (required_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = req.userData.permissionLevel;

        if (user_permission_level == required_permission_level) {
            return next();
        } else {
            return res.status(403).send('Forbidden');
        }
    }
}