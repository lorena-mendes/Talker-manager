const { readFile } = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

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

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = {
  getAllTalkers,
  getTalkerByID,
  generateToken,
};
