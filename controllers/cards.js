const CardModel = require("../models/card");
//возвращает все карты
const getCards = (req, res) => {
  return CardModel.find()
  .then((data) => {
    return res.status(201).send(data);
  })
  .catch((err) => {
    return res.status(500).send({ message: "Server Error" }); 
  })
};
//создаёт карты
const createCard = (req, res) => {
  const {name, link} = req.body;
  const owner = req.user._id;
  return CardModel.create({name, link, owner})
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
//удаление карточки по ID
const deleteCardById = (req, res) => {
  return CardModel.findByIdAndDelete(req.params.cardId)
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
//лайк карточки
const addCardLike = (req, res) => {
  return CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
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
//удаление лайка
const deleteCardLike = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, 
    { new: true },
  )
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

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLike,
  deleteCardLike,
};