/**
 *	Dependencies
 */
const express = require('express'),
	path = require('path');
	http = require('http');
	bodyParser = require('body-parser');
	PassportTwitter = require('passport-twitter').Strategy;
	Twitter = require('twitter'),
	passport = require('passport'),
	expressSession = require('express-session');

// Config
var config = require(path.join(__dirname, 'server','lib','config', 'config')).getConfig();
	config.set('rootPath', __dirname);
	config.set('port', 3000);
	config.set('rootUrl','http://localhost:' + config.get('port'));
	config.set('consumerKey', 'xqnQeoqwxGIS7lpdhJ1UdGc5p');
	config.set('consumerSecret','Qe17r4oqYlyBRvftcahO9rWzt2ghV2N8bnghctbswPymCJfESC');
	config.set('twitterCallbackURL', config.get('rootUrl') + '/api/login/twitter/return');
	config.set('apiSecret', '60dd06aa-cf8e-4cf8-8925-6de720015ebf');

// Get API routes
const api = require('./server/routes/api')(express).getInstance();

// Get instance of app.
const app = require('./server/app/app')(express, bodyParser, expressSession, path, api, config).getInstance();

/**
 * Listen on provided port, on all network interfaces.
 */
http.createServer(app).listen(app.get('port'), () => console.log(`API running on localhost:${app.get('port')}`));