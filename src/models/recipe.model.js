const mongoose = require('mongoose');
const Recipe = mongoose.model(
    'Recipe',
    new mongoose.Schema({
      name: {type: String, unique: true, required: true},
    }),
);
module.exports = Recipe;
