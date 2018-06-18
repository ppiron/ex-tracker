const express = require('express');
const app = express();
const newRoute = require('./routes/new-user');
const addRoute = require('./routes/add');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static('./frontend'));

app.use(newRoute);
app.use(addRoute);
module.exports = app;