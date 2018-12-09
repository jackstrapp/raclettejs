var express = require('express');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'tests', 'testServer', 'index.html'));
});
app.get('/server.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'server.js'));
});

app.listen(8080);