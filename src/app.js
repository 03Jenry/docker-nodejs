"use strict";
var express = require('express');
var app = express();
app.use(require('./routes/index'));
module.exports = app;