const Task = require("../models/task");
const NotFoundError = require("../errors/NotFound");
const WrongOwner = require("../errors/WrongOwner");
const ValidationError = require("../errors/ValidationError");
const { checkBadData } = require("../middlewares/errors");
const UsedEmail = require("../errors/UsedEmail");

module.exports.getTasks = (req, res, next) => {
  const { _id } = req.user;
  Task.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch((e) => next(e));
};

module.exports.deleteTask = (req, res, next) => {
  const { _id } = req.user;
  const { taskId } = req.params;
  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        throw new NotFoundError("Не найдено");
      }
      if (task.owner.toString() !== _id) {
        throw new WrongOwner("Для удаления необходимо быть создателем поста");
      }
      Task.findByIdAndDelete(taskId)
        .then(() => res.send({ message: "Успешно" }))
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
};

module.exports.createTask = (req, res, next) => {
  const { _id } = req.user;

  const { text } = req.body;

  Task.create({
    text,
    owner: _id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new ValidationError("Ошибка валидации"));
      }
      return next(err);
    });
};

module.exports.updateTask = (req, res, next) => {
  const { _id } = req.user;
  const { text, active, startTime, endTime, completed } = req.body;
  Task.findByIdAndUpdate(
    _id,
    { $set: { text, active, startTime, endTime, completed } },
    { new: true, runValidators: true },
  )
    .then((task) => checkBadData(task, res))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new UsedEmail("Email занят"));
      }
      if (err.name === "ValidationError") {
        return next(new ValidationError("Ошибка валидации"));
      }
      return next(err);
    });
};
