const connection = require('./connection');

const findEmail = async ({ email }) => {
    const userEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));
    return userEmail;
};

const create = async ({ name, email, password }) => {
    const userDataNew = await connection()
    .then((db) => db.collection('users').insertOne({ name, email, password }));
    return { user: { _id: userDataNew.insertedId, name, email, role: 'user' } };
};

module.exports = {
    findEmail,
    create,
};