const CardModel = require("../models/card");
//возвращает все карты
const getCards = (req, res) => {
  return CardModel.find()
  .then((data) => {
    return res.send(data);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({message: "Переданы некорректные данные"})
    } else {
      res.status(500).send({message: "Произошла ошибка на сервере"})
    }
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
      if (err.name === 'ValidationError') {
        res.status(400).send({message: "Переданы некорректные данные"})
      } else {
        res.status(500).send({message: "Произошла ошибка на сервере"})
      }
    })
};
//удаление карточки по ID
const deleteCardById = (req, res) => {
  return CardModel.findByIdAndDelete(req.params.cardId)
  .orFail(() => new Error('NotFoundError'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' })
      } else if (err.message === 'NotFoundError') {
        res.status(404).send({ message: 'Пользователь не найден' })
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' })
      }
    })
};
//лайк карточки
const addCardLike = (req, res) => {
  return CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
  .orFail(() => new Error('NotFoundError'))
    .then((card) => {
      res.send(card)
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' })
      } else if (err.message === 'NotFoundError') {
        res.status(404).send({ message: 'Пользователь не найден' })
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' })
      }
    })
};
//удаление лайка
const deleteCardLike = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, 
    { new: true },
  )
  .orFail(() => new Error('NotFoundError'))
  .then((card) => {
    res.send(card)
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Переданы некорректные данные' })
    } else if (err.message === 'NotFoundError') {
      res.status(404).send({ message: 'Пользователь не найден' })
    } else {
      res.status(500).send({ message: 'Произошла ошибка на сервере' })
    }
  })
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  addCardLike,
  deleteCardLike,
};