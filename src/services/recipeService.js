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

module.exports = {
    insertRecipe,
};