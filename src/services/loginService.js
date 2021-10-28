const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

const SECRET = 'mysecret';

const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
};

const insertLogin = async (login) => {
    const validationLogin = schema.validate(login);
    if (validationLogin.error) {
        return { status: 401, result: { message: 'All fields must be filled' } };
    }

    const userSearch = await usersModel.findEmail(login);
    if (!userSearch || userSearch.password !== login.password) {
        return { status: 401, result: { message: 'Incorrect username or password' } };
    }
    // dentro do meu userSearch tem meu password, isso siginifica que vai passar o password para meu payload
    // não posso fazer isso pois senão ele fica publico.

    // com isso crio uma nova const e crio um destructuring para pegar o password e extrair somente o password
    // e o resto coloco numa variavel chamanda user.
    // com isso temos um usuario sem o password no payload userSearch.
    // password: _ , significa que não vou passar nada.

    const { password: _, ...user } = userSearch;

    const token = jwt.sign(user, SECRET, jwtConfig);
    return { status: 200, result: { token } };
};

module.exports = { insertLogin };
