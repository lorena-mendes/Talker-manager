const emailValidate = (email, res) => {
  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return null;
};

const passwordValidate = (password, res) => {
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return null;
};

const validateNewUser = async (req, res, next) => {
  const { email, password } = req.body;

  const validEmail = emailValidate(email, res);
  if (email !== null) return validEmail;

  const validPassword = passwordValidate(password, res);
  if (email !== null) return validPassword;

  next();
};

module.exports = {
  validateNewUser,
};