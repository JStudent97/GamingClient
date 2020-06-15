const mongoose = require('mongoose');
      Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

module.exports = Message = mongoose.model('message', MessageSchema);
