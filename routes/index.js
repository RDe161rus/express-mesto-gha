/* eslint-disable no-undef */
const router = require("express").Router();

const userRouter = require("./users");
const cardRouter = require("./cards");

router.get("/", (req, res) => {
  res.status(201).send("hello_world");
});
router.post("/post", (req, res) => {
  const { name } = req.body;
  res.status(201).send(name);
});


router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Переданы некорректные данные'));
});
module.exports = router;
