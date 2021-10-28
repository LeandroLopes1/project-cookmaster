const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const SECRET = 'mysecret';

const tokenValidation = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'missing auth token',
        });
    }
    try {
        const decoded = jwt.verify(token, SECRET);
        const user = await usersModel.findEmail(decoded);
        if (!user) {
            return res.status(401).json({ message: 'invalid user' });
        }
        const { password, ...userWithoutPassword } = user;
        req.user = userWithoutPassword;
        next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};
module.exports = { tokenValidation };