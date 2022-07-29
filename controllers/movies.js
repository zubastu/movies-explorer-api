const Movie = require('../models/movies');
const NotFoundError = require('../errors/NotFound');
const WrongOwner = require('../errors/WrongOwner');
const ValidationError = require('../errors/ValidationError');

module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch((e) => next(e));
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.user;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Не найдено');
      }
      if (movie.owner.toString() !== _id) {
        throw new WrongOwner('Для удаления необходимо быть создателем поста');
      }
      Movie.findByIdAndDelete(movieId)
        .then(() => res.send({ message: 'Успешно' }))
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
};

module.exports.createMovie = (req, res, next) => {
  const { _id } = req.user;

  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: _id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Ошибка валидации'));
      }
      return next(err);
    });
};
