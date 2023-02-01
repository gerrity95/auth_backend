const mongoose = require('mongoose');
const User = mongoose.model(
    'User',
    new mongoose.Schema({
      username: {type: String, unique: true, required: true},
      email: {type: String, unique: true, required: true},
      password: String,
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Role',
        },
      ],
    }),
);
module.exports = User;
