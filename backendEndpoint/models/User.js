const mongoose = require('mongoose');
      Schema = mongoose.Schema;
      bcrypt = require('bcrypt');
      SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  friendship: [String]
});

UserSchema.pre('save', async function save(next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    // generate a salt
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

    // hash pass
    user.password = await bcrypt.hash(user.password, salt);
    return next()
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword =  async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

module.exports = User = mongoose.model('user', UserSchema);
