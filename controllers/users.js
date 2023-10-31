/* eslint-disable no-undef */
const UserModel = require("../models/user");

//возвращает всех пользователей
const getUsers = (req, res) => {
  return UserModel.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка на сервере" });
      }
    });
};
//возвращает пользователя по _id
const getUsersById = (req, res) => {
  const { userId } = req.params;
  return UserModel.findById(userId)
    .orFail(() => new Error("NotFoundError"))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.message === "NotFoundError") {
        res.status(404).send({ message: "Пользователь не найден" });
      } else {
        res.status(500).send({ message: "Произошла ошибка на сервере" });
      }
    });
};
//создаёт пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  UserModel.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Произошла ошибка на сервере" });
      }
    });
};
//обнавление пользователя
const updateUserById = (req, res) => {
  const { name, about } = req.body;
  return UserModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => new Error("NotFoundError"))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.message === "NotFoundError") {
        res.status(404).send({ message: "Пользователь не найден" });
      } else {
        res.status(500).send({ message: "Произошла ошибка на сервере" });
      }
    });
};
//обнавление аватара
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  return UserModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new Error("NotFoundError"))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else if (err.message === "NotFoundError") {
        res.status(404).send({ message: "Пользователь не найден" });
      } else {
        res.status(500).send({ message: "Произошла ошибка на сервере" });
      }
    });
};
module.exports = {
  createUser,
  getUsers,
  getUsersById,
  updateUserById,
  updateUserAvatar,
};
