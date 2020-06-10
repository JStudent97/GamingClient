"use strict";
const mongoose = require('mongoose');
const db = require('./config/privateKeys').mongoUri;

class DatabaseHandler {

  constructor() {
    mongoose
      .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('MongoDB Connected...'))
      .catch(err => console.log(err));
  }


}

module.exports = DatabaseHandler;
