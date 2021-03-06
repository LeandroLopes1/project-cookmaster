const joi = require('joi');
const recipesModel = require('../models/recipesModel');

const schema = joi.object({
    name: joi.string().required(),
    ingredients: joi.string().required(),
    preparation: joi.string().required(),
});

const insertRecipe = async (recipe, userId) => {
    const recipeValidation = schema.validate(recipe);
    if (recipeValidation.error) {
        return { status: 400, result: { message: 'Invalid entries. Try again.' } };
    }
    const newRecipe = await recipesModel.create(recipe, userId);
    
    return { status: 201, result: newRecipe };
};

const getRecipes = async () => {
    const recipes = await recipesModel.listRecipes();
    return { status: 200, result: recipes };
};

const getRecipeId = async (id) => {
    const recipe = await recipesModel.getRecipe(id);
    if (!recipe) {
        return { status: 404, result: { message: 'recipe not found' } };
    }
    return { status: 200, result: recipe };
};

const updateRecipe = async (id, recipeDataNew) => {
    const recipe = await recipesModel.updateRecipe(id, recipeDataNew);
    return { status: 200, result: recipe };
};

const deleteRecipe = async (id) => {
    const recipe = await recipesModel.deleteRecipe(id);
    return { status: 204, result: recipe };
};

const addImage = async (id, image) => {
    const recipe = await recipesModel.addImage(id, image);
    return { status: 200, result: recipe };
};

module.exports = {
    insertRecipe,
    getRecipes,
    getRecipeId,
    updateRecipe,
    deleteRecipe,
    addImage,
};