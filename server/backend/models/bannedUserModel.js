const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bannedUserModel = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  bannedFor: { type: String, required: true },
  bannedBy: { type: String },
  image: { type: String },
  images: { type: Array }
});

module.exports = mongoose.model('bannedUsers', bannedUserModel);
