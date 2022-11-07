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

module.exports = {
  getAllTalkers,
  getTalkerByID,
  generateToken,
  addNewTalker,
};
