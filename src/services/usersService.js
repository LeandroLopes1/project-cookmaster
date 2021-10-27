const Joi = require('joi');
const usersModel = require('../models/usersModel');

const schema = Joi.object({ name: Joi.string().required(), 
    email: Joi.string().email().required(),
    password: Joi.string().required() });

const registreition = async (user) => {
    const validationEmail = await usersModel.findEmail(user);
    const validationName = schema.validate(user);
    if (validationName.error) {
        return { status: 400, result: { message: 'Invalid entries. Try again.' } };
    }
    if (validationEmail) {
        return { status: 409, result: { message: 'Email already registered' } };
    }

    const result = await usersModel.create(user);

    return { status: 201, result };
};

module.exports = {
    registreition,
};