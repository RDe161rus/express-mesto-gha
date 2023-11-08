const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const urlValidate = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;
const {
  getUsersById,
  getUsers,
  updateUserById,
  updateUserAvatar,
  getUserCurrent,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserCurrent);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).hex(),
  }),
}), getUsersById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserById);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlValidate),
  }),
}), updateUserAvatar);

module.exports = router;
