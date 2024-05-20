const express = require('express');
const { clog } = require('../js/clog'); 
const noteRoute = require('./notes');
const app = express();

app.use('/notes', noteRoute);
app.use(clog);

module.exports= app;