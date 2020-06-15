const mongoose = require('mongoose');
      Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  }
});

module.exports = FriendRequest = mongoose.model('friendRequest', FriendRequestSchema);
