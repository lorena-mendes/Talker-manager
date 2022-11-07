const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED)
    .json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 || (typeof authorization) !== 'string') {
    return res.status(HTTP_UNAUTHORIZED)
    .json({ message: 'Token inválido' });
  }
  return next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (name === undefined) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
  };

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (age === undefined) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return next();
  };
  
const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (talk === undefined) {
   return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
};

const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (watchedAt === undefined) {
   return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const validDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/.test(watchedAt);
  if (!validDate) {
    return res.status(HTTP_BAD_REQUEST)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

const validateRate = (req, res, next) => {
  const { talk: { rate } } = req.body;

  if (rate === undefined) {
    return res.status(HTTP_BAD_REQUEST)
     .json({ message: 'O campo "rate" é obrigatório' });
   }
   if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(HTTP_BAD_REQUEST)
     .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
   }
  return next();
};

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};