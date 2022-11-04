const { readFile } = require('fs').promises;
const path = require('path');

const talkersPath = path.resolve(__dirname, '..', 'talker.json');

// const readTalkers = async () => {
//   const response = await readFile(talkersPath, 'utf-8');
//   const talkers = JSON.parse(response);
//   return talkers;
// };

const getAllTalkers = async () => {
  const response = await readFile(talkersPath, 'utf-8');
  const talkers = JSON.parse(response);
  return talkers || [];
};

const getTalkerByID = async (id) => {
  const response = await readFile(talkersPath, 'utf-8');
  const allTalkers = JSON.parse(response);
  const talkerID = allTalkers.find((talker) => talker.id === id);
  console.log(talkerID);
  return talkerID;
};

module.exports = {
  getAllTalkers,
  getTalkerByID,
};
