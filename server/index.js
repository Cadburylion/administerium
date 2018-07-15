require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const bannedUser = require('./backend/routes/bannedUser.js');
const bannedUsers = require('./backend/routes/bannedUsers.js');
const router = require('./router');

// DB Setup
const db = mongoose.connect(
  process.env.DB_ADDRESS,
  { useNewUrlParser: true }
);

// App setup
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/../build`));

// API routes
app.use('/bannedUser', bannedUser);
app.use('/bannedUsers', bannedUsers);
router(app);
app.get('/', (req, res) => res.sendFile(`${__dirname}/../build/index.html`));

// Server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port, () =>
  console.log(`Administerium is online at port: ${port}`)
);
