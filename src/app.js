const morgan = require('morgan');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var comments = require('./data/comments.json');


var app = express();

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.get('/api/comments', function(req, res, next) {
    res.send(comments);
});

app.post('/api/comments', function(req, res, next) {
    console.log(req.body);
    comments.push(req.body);
});

app.use(function(req, res) {
    res.status(404).send('Nothing here');
});

app.listen(3000, function() {
    console.log('App running on port 3000.');
});