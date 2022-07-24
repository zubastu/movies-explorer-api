const NotFoundErr = require('../errors/NotFound');

module.exports.errorProcessing = (err, res) => res.status(err.status || 500).send({ message: `${err.message}` });

module.exports.checkBadData = (data, res) => {
  if (!data) {
    throw new NotFoundErr('Не найдено');
  }
  return res.send(data);
};
