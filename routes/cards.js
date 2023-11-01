const router = require("express").Router();

const {
  getCards,
  createCard,
  deleteCardById,
  addCardLike,
  deleteCardLike,
} = require("../controllers/cards");

//возвращает всех пользователей
router.get("/", getCards);
//создаёт пользователя
router.post("/", createCard);
//удаление карточки по ID
router.delete("/:cardId", deleteCardById);
//лайк карточки
router.put("/:cardId/likes", addCardLike);
//удаление лайка
router.delete("/:cardId/likes", deleteCardLike);

module.exports = router;
