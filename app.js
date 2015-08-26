var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = module.exports.app = exports.app = express();
var cheerio = require('cheerio');
var request = require('request');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all('/api/*', [require('./helpers/validateRequest')]);
app.use('/', require('./routes'));
//app.post('/grades', require('./routes/grades'));

//app.post('/schedule', require('./routes/schedule'));

var home = [	'<html>',
		'<head><title>CETYS API</title></head>',
		'<body>',
		'<h1>API para micampus de CETYS</h1>',
		'<br /><h3>Requests validos:</h3>',
		'<h4>/grades</h4> Regresa JSON con las calificaciones',
		'<h4>/schedule</h4> Regresa JSON con los horarios',
		'<br /><br />Para utilizar simplemente mandar HTTP Request de POST con los parametros:<br />',
		'<strong>user</strong> :m0xxxxxxx<br />',
		'<strong>password</strong> :clave de micampus',
		'</body></html>'].join('');

app.get('/', function(req, res){
	res.send(home);
});

app.get('*', function(req, res){
	res.send('404');
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
