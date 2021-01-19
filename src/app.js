"use strict";
var express = require('express');
var app = express();
require('./connection/index');
app.use(require('./routes/index'));
module.exports = app;