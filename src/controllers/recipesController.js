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

const recipeUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const { _id: userId, role } = req.user;
    const { status, result } = await recipesService
      .updateRecipe({ id, name, ingredients, preparation, userId, role });
    return res.status(status).json(result);
  };

const recipeDelete = async (req, res) => {
    const { id } = req.params;
    const { status, result } = await recipesService.deleteRecipe(id);
    return res.status(status).json(result);
};

const addImage = async (req, res) => {
    const { id } = req.params;
    const { filename } = req.file;
    const image = `localhost:3000/src/uploads/${filename}`;
    const { status, result } = await recipesService.addImage(id, image);
    return res.status(status).json(result);
};

module.exports = {
    recipeRegister,
    recipeList,
    recipeDetails,
    recipeUpdate,
    recipeDelete,
    addImage,
};