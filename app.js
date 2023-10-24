/* eslint-disable no-undef */
const express = require('express')
const { PORT = 3000} = process.env;
const UserModel = require('/models/user');
//const CardModel = require('/models/card');
console.log(UserModel);

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
.then(() => {
  console.log("Connected to MongooDB");
})
.catch((err) => {
  console.error(err);
})




const app = express();
app.use(express.json());



app.get('/', (req, res) => {

  res.send('Hello___World')
})

app.post('/post', (req, res) => {
  const {name} = req.body;
  res.status(201).send(name)
})


//CRUD
app.post('/users', (req, res) => {
  const userData = req.body;
  console.log(userData);
  return UserModel.create(userData)
  .then(() => {
    return res.status(201).send(data);
  })
  .catch((err) => {
    console.log(err);
  })
})









app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})