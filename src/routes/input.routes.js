const express = require('express');
const router = express.Router();
const db = require('../models');
const Role = db.role;
const Category = db.category;

module.exports = router;

router.post('/addRoles', async (req, res, next) => {
  new Role({
    name: 'user',
  }).save((err) => {
    if (err) {
      console.log('error', err);
    }
    console.log('added \'user\' to roles collection');
  });
  new Role({
    name: 'moderator',
  }).save((err) => {
    if (err) {
      console.log('error', err);
    }
    console.log('added \'moderator\' to roles collection');
  });
  new Role({
    name: 'admin',
  }).save((err) => {
    if (err) {
      console.log('error', err);
    }
    console.log('added \'admin\' to roles collection');
  });
  return res.send({'success': true});
});

router.post('/addCategories', async (req, res, next) => {
  new Category({
    name: 'breakfast',
  }).save((err) => {
    if (err) {
      console.log('error', err);
    }
    console.log('added \'breakfast\' to category collection');
  });
  new Category({
    name: 'lunch',
  }).save((err) => {
    if (err) {
      console.log('error', err);
    }
    console.log('added \'lunch\' to category collection');
  });
  new Category({
    name: 'dinner',
  }).save((err) => {
    if (err) {
      console.log('error', err);
    }
    console.log('added \'dinner\' to category collection');
  });
  new Category({
    name: 'snacks',
  }).save((err) => {
    if (err) {
      console.log('error', err);
    }
    console.log('added \'snacks\' to category collection');
  });
  return res.send({'success': true});
});

module.exports = router;
