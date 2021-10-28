const recipesService = require('../services/recipeService');

const recipeRegister = async (req, res) => {
    const recipe = req.body;
    const { _id: userId } = req.user;
    const { status, result } = await recipesService.insertRecipe(recipe, userId);
    return res.status(status).json(result);
};

const recipeList = async (req, res) => {
    const { status, result } = await recipesService.getRecipes();
    return res.status(status).json(result);
};

const recipeDetails = async (req, res) => {
    const { status, result } = await recipesService.getRecipeId(req.params.id);
    return res.status(status).json(result);
};

module.exports = {
    recipeRegister,
    recipeList,
    recipeDetails,
};