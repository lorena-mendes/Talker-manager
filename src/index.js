const express = require('express');
const bodyParser = require('body-parser');

const {
  getAllTalkers,
  getTalkerByID,
  generateToken,
  addNewTalker,
  editTalker,
  deleteTalker,
  searchTerm,
} = require('./utils/handleTalkers');
const { validateLogin } = require('./middlewares/validateLogin');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./middlewares/validateNewTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_NO_CONTENT = 204;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const result = await searchTerm(q);  
  return res.status(HTTP_OK_STATUS).json(result);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerID = await getTalkerByID(Number(id));
  if (talkerID) {
    return res.status(HTTP_OK_STATUS).json(talkerID);
  } 
  return res.status(HTTP_NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validateLogin, async (_req, res) => {
  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post('/talker',
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate, async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = await addNewTalker({ name, age, talk: { watchedAt, rate } });

  return res.status(HTTP_CREATED).json(newTalker);
});

app.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchedAt,
validateRate,
editTalker, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editID = await editTalker(id, name, age, talk);
  return res.status(HTTP_OK_STATUS).json(editID);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  res.status(HTTP_NO_CONTENT).json();
});