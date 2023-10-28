const CardModel = require("../models/card");

const getCards = (req, res) => {
  return CardModel.find()
    .then((users) => {
      return res.status(201).send(users);
    })
    .catch(() => {
      return res.status(500).send({ message: "Server Error" });
    });
};

const createCard = (req, res) => {
  const cardData = req.body;
  return CardModel.create(cardData)
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

const deleteCardById = (req, res) => {
  return res.status(500).send({ message: "Server Error" });
};

const addCardLike = (req, res) => {
  return res.status(500).send({ message: "Server Error" });
};

const deleteCardLike = (req, res) => {
  return res.status(500).send({ message: "Server Error" });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLike,
  deleteCardLike,
};





/* GET /cards — возвращает все карточки из базы;
POST /cards — создаёт карточку с переданными в теле запроса name и link , устанавливает поле owner для
карточки;
DELETE /cards/:cardId — удаляет карточку по _id ;
PUT /cards/:cardId/likes — ставит лайк карточке;
DELETE /cards/:cardId/likes — убирает лайк с карточки.
 */