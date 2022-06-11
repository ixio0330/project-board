// express
const express = require('express');
const app = express();

// router
const router = require('./src/router/index');

// cors
const cors = require('cors');

// body 파싱
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router
app.use('/', router);

module.exports = app;
