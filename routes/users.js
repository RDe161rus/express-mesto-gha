/* eslint-disable no-undef */
const router = require("express").Router();

const {
  createUser,
  getUsersById,
  getUsers,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");

//возвращает всех пользователей
router.get("/", getUsers);
//создаёт пользователя
router.post("/", createUser);
//возвращает пользователя по _id
router.get("/:userId", getUsersById);
//обнавление
router.patch("/:userId", updateUserById);
//удаление
router.delete("/:userId", deleteUserById);

module.exports = router;
