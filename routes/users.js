const router = require('express').Router();

const {
  getUsersById,
  getUsers,
  updateUserById,
  updateUserAvatar,
  getUserCurrent,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserCurrent);
router.get('/:userId', getUsersById);
router.patch('/me', updateUserById);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
