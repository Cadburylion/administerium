const express = require('express');
const User = require('../models/bannedUserModel');
const bannedUser = express.Router();

// middleware
bannedUser.use('/:name', (req, res, next) => {
  let uName = new RegExp(req.params.name, 'i');
  User.find({ name: uName }, (err, bannedUser) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.bannedUser = bannedUser;
    }
    next();
  });
});

bannedUser.route('/:name').get((req, res) => {
  res.json(req.bannedUser);
}); // get

module.exports = bannedUser;
