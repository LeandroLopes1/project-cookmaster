const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');
const recipesService = require('../services/recipeService');

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

const validateUser = async (req, res, next) => {
    const { _id, role } = req.user;
    const { id } = req.params;
    try {
      const recipe = await recipesService.getRecipeId(id);
      const { status, result } = recipe;
      if (status === 404) return next(recipe);
      if (role !== 'admin' && result.userId.toString() !== _id.toString()) {
        return next({ status: 404, err: 'User without permission to change' });
      }
  
      next();
    } catch (error) {
      next(error);
    }
};

module.exports = { tokenValidation, validateUser };