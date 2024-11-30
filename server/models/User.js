const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
  userId: { type: Number, unique: true }, // Auto-incremented
  userEmail: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/, // Regex for email validation
  },
  userPassword: { type: String, required: true }, // Ideally hashed
  isAdmin: { type: Boolean, default: false },
});

// Add auto-increment plugin to userId
UserSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('User', UserSchema);
