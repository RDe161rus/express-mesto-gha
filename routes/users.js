const router = require('express').Router();

const {
  createUser,
  getUsersById,
  getUsers,
  updateUserById,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUsersById);
router.post('/', createUser);
router.patch('/me', updateUserById);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
