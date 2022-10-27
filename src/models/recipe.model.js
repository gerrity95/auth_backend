const mongoose = require('mongoose');
const Recipe = mongoose.model(
    'Recipe',
    new mongoose.Schema({
      name: {type: String, required: true},
      is_sample: {type: Boolean, default: false},
      description: {type: String, required: true},
      category: [
        {
          type: String,
          ref: 'Category',
        },
      ],
      servings: {type: Number, required: false},
      cooking_time: {type: String, required: false},
      website: {type: String, required: false},
      image: {type: String, required: false},
      tags: {type: Array, required: false},
      ingredients: {type: Array, required: true},
      prep_instructions: {type: Array, required: false},
      cooking_instructions: {type: Array, required: false},
      user_id: {type: Array, required: false},
      author: {type: String, required: false},
    }),
);
module.exports = Recipe;
