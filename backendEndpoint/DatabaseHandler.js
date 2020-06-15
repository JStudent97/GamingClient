"use strict";
const mongoose = require('mongoose');
const db = require('./config/privateKeys').mongoUri;
var User = require('./models/User');
var FriendRequest = require('./models/FriendRequest');
var Message = require('./models/Message');

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

  async createFriendRequest(sender, recipient) {
    const friendRequest = new FriendRequest({
      sender: sender,
      recipient: recipient,
      status: 1
    });

    friendRequest.save(function(err) {
      if (err) throw err;

      console.log('Friend request created...');
    });

    return {
      status: true,
      message: 'Friend request successfully created'
    }
  }

  async getIncomingFriendRequests(recipient) {
    const friendRequest = await FriendRequest.find({recipient: recipient, status: 1});
    let response = {
      incomingFriendRequest: false,
      senders: null
    };

    if(!friendRequest.length) {
      return response;
    }

    response.incomingFriendRequest = true;
    response.senders = friendRequest;

    return response;
  }

  async acceptFriendRequest(sender, recipient) {
    await FriendRequest.findOneAndUpdate({
      sender: sender,
      recipient: recipient
    }, {
      status: 2
    });

    await User.findOneAndUpdate({
      username: sender
    }, {
      "$push": {friendship: recipient}
    });

    await User.findOneAndUpdate({
      username: recipient
    }, {
      "$push": {friendship: sender}
    });

    return {
      status: true
    }
  }

  async denyFriendRequest(sender, recipient) {
    await FriendRequest.findOneAndUpdate({
      sender: sender,
      recipient: recipient
    }, {
      status: 3
    });

    return {
      status: true
    }
  }

  async getFriends(username) {
    const record = await User.findOne({username: username})
                             .select('friendship');

    return record.friendship;
  }

  async addMessage(message) {
    const messageRecord = new Message({
      sender: message.sender,
      receiver: message.receiver,
      message: message.message
    });

    messageRecord.save(function(err) {
      if (err) throw err;

      console.log('Message created...');
    });

    return {
      status: true,
      message: 'Message successfully created'
    }
  }

  async getMessages() {
    return await Message.find();
  }


}

module.exports = DatabaseHandler;
