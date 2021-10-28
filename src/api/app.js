const express = require('express');
const bodyParser = require('body-parser').json();
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');
const { tokenValidation } = require('../utils/auth');

const app = express();
app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.userRegister);

app.post('/login', loginController.createLogin);

app.post('/recipes', tokenValidation, recipesController.recipeRegister);

app.get('/recipes', recipesController.recipeList);

module.exports = app;
