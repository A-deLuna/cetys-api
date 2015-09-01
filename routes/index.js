var express = require('express');
var router = express.Router();

var auth = require('./auth');
var grades = require('./grades');
var schedule = require('./schedule');

router.post('/login', auth.login);
router.get('/api/schedule',schedule);
router.get('/api/grades',grades);

module.exports = router;
