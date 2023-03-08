const mongoose = require('mongoose');
const logger = require('../../middleware/logger');
const Recipes = require('../models/recipe.model');
const Roles = require('../models/role.model');
const Categories = require('../models/category.model');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const seedRecipes = async () => {
  const recipeFile = fs.readFileSync(require('path').resolve(__dirname, './sample_recipes.json'));
  const recipes = JSON.parse(recipeFile);
  return recipes;
};

const seedCategories = () => {
  const categories = [
    {
      name: 'Breakfast',
    },
    {
      name: 'Lunch',
    },
    {
      name: 'Dinner',
    },
    {
      name: 'Snacks',
    },
  ];
  return categories;
};

const seedRoles = () => {
  const roles = [
    {
      name: 'user',
    },
    {
      name: 'moderator',
    },
    {
      name: 'admin',
    },
  ];
  return roles;
};

const seedDb = async () => {
  const recipes = await seedRecipes();
  const categories = seedCategories();
  const roles = seedRoles();
  await Recipes.insertMany(recipes);
  await Categories.insertMany(categories);
  await Roles.insertMany(roles);
};

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  directConnection: true,
  useUnifiedTopology: true,
};

// eslint-disable-next-line max-len
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?directConnection=true&authSource=${MONGO_DB}&replicaSet=replicaset&retryWrites=true`;

mongoose.connect(url, options).then( function() {
  logger.info('Connected to MongoDB');
  seedDb()
      .then(() => {
        logger.info('Succesfully seeded database with initial data...');
        mongoose.connection.close();
      })
      .catch((err) => {
        logger.error(`Error ${err} attempting to seed database`);
        mongoose.connection.close();
      });
}).catch( function(err) {
  logger.info(err);
});

