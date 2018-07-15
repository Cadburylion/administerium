require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const bannedUser = require('./backend/routes/bannedUser.js');
const bannedUsers = require('./backend/routes/bannedUsers.js');
const app = express();

const db = mongoose.connect(
  process.env.DB_ADDRESS,
  { useNewUrlParser: true }
);

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/../build`));

app.use('/bannedUser', bannedUser);
app.use('/bannedUsers', bannedUsers);

app.get('/', (req, res) => res.sendFile(`${__dirname}/../build/index.html`));

let port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Administerium is online at port: ${port}`));
