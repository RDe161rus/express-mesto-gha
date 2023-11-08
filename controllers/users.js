const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const getUsers = (req, res) => {
  UserModel.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

const getUsersById = (req, res) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .orFail(() => new Error('NotFoundError'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFoundError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  return UserModel.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        res.status(409).send({ message: 'Неверная почта или пароль' });
      }
      const token = jwt.sign({ _id: user._id }, 'jwt_secret', { expiresIn: '7d' });
      res.status(201).send({ token });
    })
    .catch(() => {
      res.status(401).send({ message: 'Неверная почта или пароль' });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then(() => {
      res.status(201).send({
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(409).send({ message: 'Указанный email уже существует' });
      } else if (err.name === 'ValidationError') {
        res.status(401).send({ message: 'Переданы некорректные данные' });
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

const updateUserById = (req, res) => {
  const { name, about } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('NotFoundError'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFoundError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  UserModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('NotFoundError'))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFoundError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

const getUserCurrent = (req, res) => {
  UserModel.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else if (err.message === 'CastError') {
        res.status(401).send({ message: 'Переданы некорректные данные' });
      }
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  login,
  createUser,
  getUsers,
  getUsersById,
  updateUserById,
  updateUserAvatar,
  getUserCurrent,
};
