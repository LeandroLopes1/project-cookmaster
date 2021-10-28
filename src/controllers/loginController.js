const loginService = require('../services/loginService');

const createLogin = async (req, res) => {
    const login = req.body;
    const { status, result } = await loginService.insertLogin(login);
    return res.status(status).json(result);
};

module.exports = {
    createLogin,
};