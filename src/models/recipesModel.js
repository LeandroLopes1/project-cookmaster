const connection = require('./connection');

const create = async ({ name, ingredients, preparation }, userId) => {
    const recipeDataNew = await connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }));
    const { insertedId: _id } = recipeDataNew;
    return { recipe: { name, ingredients, preparation, userId, _id } };
};

module.exports = {
    create,
};