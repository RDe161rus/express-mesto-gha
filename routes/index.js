const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const cardRouter = require('./cards');

router.post('/signin', login);
router.post('/signup', createUser);

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('*', (req, res) => {
  res.status(404).send({
    message: 'Переданы некорректные данные',
  });
});

module.exports = router;
