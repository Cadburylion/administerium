const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bannedUserModel = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  bannedFor: { type: String, required: true },
  bannedBy: { type: String }
});

module.exports = mongoose.model('bannedUsers', bannedUserModel);
