const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieValidation, movieDeleteValidation } = require('../validation/validation');

router.get('/', getMovies);
router.post('/', movieValidation, createMovie);
router.delete('/:movieId', movieDeleteValidation, deleteMovie);

module.exports = router;
