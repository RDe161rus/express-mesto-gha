
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30,
  },
  link:{
    type: String,
    require: true,
  },
  owner:{
    type: Object,
    require: true,
  },
  likes:[{
    type: Object,
    default: [],
  }
  ],
  createdAT:{
    type: Date,
    default: Date.now,
  },
})



module.exports = mongoose.model('card', cardSchema);
