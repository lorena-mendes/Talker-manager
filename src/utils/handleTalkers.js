const { readFile } = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const fs = require('fs').promises;

const talkersPath = path.resolve(__dirname, '..', 'talker.json');

const getAllTalkers = async () => {
  const response = await readFile(talkersPath, 'utf-8');
  const talkers = JSON.parse(response);
  return talkers || [];
};

const getTalkerByID = async (id) => {
  const response = await readFile(talkersPath, 'utf-8');
  const allTalkers = JSON.parse(response);
  const talkerID = allTalkers.find((talker) => talker.id === id);
  return talkerID;
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

const addNewTalker = async ({ name, age, talk: { watchedAt, rate } }) => {
  const talkers = await getAllTalkers();
  const id = talkers[talkers.length - 1].id + 1;
  const newTalker = {
    id,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  talkers.push(newTalker);
  await fs.writeFile(talkersPath, JSON.stringify(talkers, null, 2));
  return newTalker;
};

const editTalker = async (id, name, age, { watchedAt, rate }) => {
  const allTalkers = await readFile(talkersPath, 'utf-8');
  const talkers = JSON.parse(allTalkers);
  const index = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[index] = { id: +id, name, age, talk: { watchedAt, rate } };
  const upDateTalkers = JSON.stringify(talkers, null, 2);
  await fs.writeFile(talkersPath, upDateTalkers);
  return talkers[index];
};

const deleteTalker = async (id) => {
  const allTalkers = await readFile(talkersPath, 'utf-8');
  const talkers = JSON.parse(allTalkers);
  const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));
  const upDateTalkers = JSON.stringify(filteredTalkers, null, 2);
  await fs.writeFile(talkersPath, upDateTalkers);
  return upDateTalkers;
};

const searchTerm = async (term) => {
  const allTalkers = await readFile(talkersPath, 'utf-8');
  const talkers = JSON.parse(allTalkers);
  const filteredTalkers = talkers
  .filter((element) => element.name.toLowerCase().includes(term.toLowerCase()));
  return filteredTalkers;
};

module.exports = {
  getAllTalkers,
  getTalkerByID,
  generateToken,
  addNewTalker,
  editTalker,
  deleteTalker,
  searchTerm,
};
