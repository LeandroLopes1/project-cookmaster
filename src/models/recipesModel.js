const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, ingredients, preparation }, userId) => {
    const recipeDataNew = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
    const { insertedId: _id } = recipeDataNew;
    return { recipe: { name, ingredients, preparation, userId, _id } };
};

const listRecipes = async () => {
    const recipes = await connection().then((db) => db.collection('recipes').find().toArray());
    return recipes;
};

const getRecipe = async (id) => {
    if (!ObjectId.isValid(id)) return null;
    const recipe = await connection().then((db) => db.collection('recipes')
    .findOne({ _id: ObjectId(id) }));
    return recipe;
};

const updateRecipe = async (id, { name, ingredients, preparation }) => {
    if (!ObjectId.isValid(id)) return null;
     await connection().then((db) => db.collection('recipes')
    .update({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }));
    return getRecipe(id);
};

module.exports = {
    create,
    listRecipes,
    getRecipe,
    updateRecipe,
};