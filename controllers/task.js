const Task = require("../models/task");
const NotFoundError = require("../errors/NotFound");
const WrongOwner = require("../errors/WrongOwner");
const ValidationError = require("../errors/ValidationError");
const { checkBadData } = require("../middlewares/errors");

module.exports.getCompletedTasks = (req, res, next) => {
  const { _id } = req.user;
  Task.find({ owner: _id })
    .then((tasks) => {
      const stagedTasks = tasks.filter(
        (task) => task.completed && !task.active,
      );
      res.send(stagedTasks);
    })
    .catch((e) => next(e));
};

module.exports.getStagedTasks = (req, res, next) => {
  const { _id } = req.user;
  Task.find({ owner: _id })
    .then((tasks) => {
      const stagedTasksList = tasks.filter((task) => !task.completed);

      const inactiveTasks = stagedTasksList.filter((task) => !task.active);
      const activeTask = stagedTasksList.filter((task) => task.active);

      const stagedTasks = [...activeTask, ...inactiveTasks];

      const mappedStagedTasks = stagedTasks.map((task, i) => {
        task.order = i;
        return task;
      });

      const sortedStagedTasks = mappedStagedTasks.sort((a, b) => a - b);
      res.send(sortedStagedTasks);
    })
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
        throw new WrongOwner("Для удаления необходимо быть создателем задачи");
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
  const { taskId } = req.params;
  const { text, active, startedTime, endTime, completed, order } = req.body;
  const { _id } = req.user;

  Task.findById(taskId)
    .then((task) => {
      if (!task) {
        throw new NotFoundError("Не найдено");
      }
      if (task.owner.toString() !== _id) {
        throw new WrongOwner(
          "Для редактирования необходимо быть создателем задачи",
        );
      }
      Task.findByIdAndUpdate(
        taskId,
        { $set: { text, active, startedTime, endTime, completed, order } },
        { new: true, runValidators: true },
      )
        .then((task) => checkBadData(task, res))
        .catch((err) => {
          if (err.name === "ValidationError") {
            return next(new ValidationError("Ошибка валидации"));
          }
          return next(err);
        });
    })
    .catch((e) => next(e));
};
