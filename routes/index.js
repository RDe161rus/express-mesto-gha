const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('*', (req, res) => {
  res.status(404).send({
    message: 'Переданы некорректные данные',
  });
});

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
