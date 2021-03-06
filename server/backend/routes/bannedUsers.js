const express = require('express');
const User = require('../models/bannedUserModel');
const bannedUser = express.Router();
const s3upload = require('../middleware/s3-upload-middleware');
const deleteImages = require('../middleware/s3-delete-middleware');

bannedUser
  .route('/')
  .get((req, res) => {
    User.find({}, (err, bannedUsers) => {
      res.json(bannedUsers);
    });
  }) // get
  .post(s3upload('images'), (req, res) => {
    if (req.files) {
      req.body.images = req.files.map(file => file.location);
    }
    let bannedUser = new User(req.body);
    bannedUser.save();
    res.status(201).send(bannedUser);
  }); // post

// middleware
bannedUser.use('/:bannedUserId', (req, res, next) => {
  User.findById(req.params.bannedUserId, (err, bannedUser) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.bannedUser = bannedUser;
    }
    next();
  });
});

bannedUser
  .route('/:bannedUserId')
  .get((req, res) => {
    res.json(req.bannedUser);
  }) // get
  .put((req, res) => {
    req.bannedUser.name = req.body.name;
    req.bannedUser.save();
    res.json(req.bannedUser);
  }) // put
  .patch((req, res) => {
    if (req.body._id) {
      delete req.body._id;
    }
    for (let a in req.body) {
      req.bannedUser[a] = req.body[a];
    }
    req.bannedUser.save();
    res.json(req.bannedUser);
  }) // patch
  .post((req, res) => {
    deleteImages(req.body);
    req.bannedUser.remove(err => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).send('removed');
      }
    });
  }); // delete

module.exports = bannedUser;
