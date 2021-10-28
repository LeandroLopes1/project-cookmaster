const recipesService = require('../services/recipeService');

const recipeRegister = async (req, res) => {
    const recipe = req.body;
    const { _id: userId } = req.user;
    const { status, result } = await recipesService.insertRecipe(recipe, userId);
    return res.status(status).json(result);
};

module.exports = {
    recipeRegister,
};