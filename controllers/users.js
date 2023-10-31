/* eslint-disable no-undef */
const UserModel = require("../models/user");

//возвращает всех пользователей
const getUsers = (req, res) => {
  return UserModel.find()
    .then((users) => {
      return res.status(201).send(users);
    })
    .catch(() => {
      return res.status(500).send({ message: "Server Error" });
    });
};
//создаёт пользователя
const createUser = (req, res) => {
  const userData = req.body;
  return UserModel.create(userData)
    .then((data) => {
      return res.status(201).send(data);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: "Server Error" });
    });
};
//возвращает пользователя по _id
const getUsersById = (req, res) => {
  const { userId } = req.params;
  return UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      return res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid ID" });
      }
      return res.status(500).send({ message: "Server Error" });
    });
};
//обнавление пользователя
const updateUserById = (req, res) => {
  const {name, about} = req.body;
  return UserModel.findByIdAndUpdate(req.user._id, {name, about}, {new: true, runValidators: true})
  .then((user) => {
    return res.send(user);
  })
  .catch((err) => {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: "Server Error" });
  });
}
//обнавление аватара
const updateUserAvatar = (req, res) => {
  const {avatar} = req.body;
  return UserModel.findByIdAndUpdate(req.user._id, {avatar}, {new: true, runValidators: true})
  .then((user) => {
    return res.send(user);
  })
  .catch((err) => {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({ message: "Server Error" });
  });
}


module.exports = {
  createUser,
  getUsers,
  getUsersById,
  updateUserById,
  updateUserAvatar,
}


