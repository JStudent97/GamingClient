"use strict";
const mongoose = require('mongoose');
const db = require('./config/privateKeys').mongoUri;
var User = require('./models/User');

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

  /**
   * email: string - the user's email
   * username: string - the user's username
   * password: string - the user's password
   */
  async createUser(email, username, password) {

    // check if username is already taken
    const record = await User.findOne({username: username});

    if (record) {
      console.log('Username already taken...');
      return {
        status: false,
        message: 'Username already taken'
      }
    }

    const user = new User({
      email: email,
      username: username,
      password: password,
      friendship: []
    });

    user.save(function(err) {
      if (err) throw err;

      console.log('User created..');
    });

    return {
      status: true,
      message: 'User successfully created'
    }
  }

  async loginUser(username, password) {

    const user = await User.findOne({username: username});
    let response = {
      status: false,
      message: null
    };

    if (!user) {
      response.message = 'Invalid credentials';
      return response;
    }

    console.log(`comparing pass...`);
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      response.status = true;
      response.message = 'Valid credentials';
    } else {
      response.message = 'Invalid credentials';
    }

    return response;
  }


}

module.exports = DatabaseHandler;
