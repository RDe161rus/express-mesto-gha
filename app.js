/* eslint-disable no-undef */
const express = require("express");
const appRouter = require("./routes");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

const app = express();
const { PORT = 3000 } = process.env;
app.use(express.json());

//МИДЛВЭР
app.use((req, res, next) => {
  req.user = {
    _id: '65411f36b66de5f28aac762f' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

//ROUTER
app.use(appRouter);

/////////////////////////////////////
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
