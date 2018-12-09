var express = require('express');
var path = require('path');
var app = express();

//starting test server that'll handle the "server" page 
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'tests', 'testServer', 'index.html'));
});
app.get('/server/index.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'server', 'index.js'));
});

let server = app.listen(8080);


var Server = require('karma').Server;
var karmaConfig = require('./karma.conf');
var karmaServer = new Server(karmaConfig, function (exitCode) {
    server.close();
    process.exit(exitCode);
});

karmaServer.start();



