const mongoose = require('mongoose');
const RecipeLink = mongoose.model(
    'RecipeLink',
    new mongoose.Schema({
      name: {type: String, required: true},
      category: [
        {
          type: String,
          ref: 'Category',
        },
      ],
      website: {type: String, required: true},
      image: {type: String, required: false},
      tags: {type: Array, required: false},
      user_id: {type: Array, required: false},
      author: {type: String, required: false},
    }),
);
module.exports = RecipeLink;
