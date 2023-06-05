
var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var https = require('https');
var fs = require('fs');

app.use(cors());

app.use(express.static(__dirname));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/HTML Files/Wine.html'));
	res.sendFile('/CSS Files/Wine.css', { root: __dirname });
})

app.get('/wine', function (req, res) {
	res.redirect('/');
})

app.get('/wines', function (req, res) {
	res.redirect('/');
})

app.get('/wine/:id', function (req, res) {
	res.redirect('/');
})

app.get('/login', function (req, res) {
	res.sendFile(path.join(__dirname + '/HTML Files/login.html'));
	res.sendFile('/CSS Files/login.css', { root: __dirname });
})

app.get('/register', function (req, res) {
	res.sendFile(path.join(__dirname + '/HTML Files/Register.html'));
	res.sendFile('/CSS Files/Register.css', { root: __dirname });
})

app.listen(8081, function () { })