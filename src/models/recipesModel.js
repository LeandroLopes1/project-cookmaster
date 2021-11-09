const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async ({ name, ingredients, preparation }, userId) => {
    const recipeDataNew = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
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

const updateRecipe = async ({ id, name, ingredients, preparation }) => {
    const recipeId = new ObjectId(id);
  const result = await connection().then((db) => db
    .collection('recipes').findOneAndUpdate({ _id: recipeId },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false })).then((res) => res.value);
  return result;
};

const deleteRecipe = async (id) => {
    const recipeId = new ObjectId(id);
    const result = await connection().then((db) => db.collection('recipes')
    .findOneAndDelete({ _id: recipeId }));
    return result;
};

module.exports = {
    create,
    listRecipes,
    getRecipe,
    updateRecipe,
    deleteRecipe,
};