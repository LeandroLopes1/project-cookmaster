const express = require('express');
const bodyParser = require('body-parser').json();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');
const loginController = require('../controllers/loginController');
const recipesController = require('../controllers/recipesController');
const { tokenValidation, validateUser } = require('../utils/auth');

const app = express();
app.use(bodyParser);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    cb(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', usersController.userRegister);

app.post('/login', loginController.createLogin);

app.post('/recipes', tokenValidation, recipesController.recipeRegister);

app.get('/recipes', recipesController.recipeList);

app.get('/recipes/:id', recipesController.recipeDetails);

app.put('/recipes/:id', tokenValidation, validateUser, recipesController.recipeUpdate);

app.put('/recipes/:id/image', tokenValidation, upload.single('image'), recipesController.addImage);

app.delete('/recipes/:id', tokenValidation, validateUser, recipesController.recipeDelete);

module.exports = app;
