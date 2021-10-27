const userService = require('../services/usersService');

const userRegister = async (req, res) => {
    const user = req.body;
    const { status, result } = await userService.registreition(user);
    return res.status(status).json(result);
};

module.exports = {
    userRegister,
};
