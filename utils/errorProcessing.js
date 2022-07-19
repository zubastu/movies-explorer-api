module.exports.errorProcessing = (err, res) => res.status(err.status).send(err.message);
