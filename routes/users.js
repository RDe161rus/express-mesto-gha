/* eslint-disable no-undef */
const router = require("express").Router();

const {
  createUser,
  getUsersById,
  getUsers,
  updateUserById,
  updateUserAvatar,
} = require("../controllers/users");

//возвращает всех пользователей
router.get("/", getUsers);
//возвращает пользователя по _id
router.get("/:userId", getUsersById);
//создаёт пользователя
router.post("/", createUser);
//обновление пользователя 
router.patch("/me", updateUserById);
//обновление аватара
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
