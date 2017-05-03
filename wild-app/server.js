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
	expressSession = require('express-session'),
	request = require('request');

// Config
var config = require(path.join(__dirname, 'server','lib','config', 'config')).getConfig();
	config.set('rootPath', __dirname);
	config.set('port', 3000);
	config.set('rootUrl','http://127.0.0.1:' + config.get('port'));
	config.set('consumerKey', 'xqnQeoqwxGIS7lpdhJ1UdGc5p');
	config.set('consumerSecret','Qe17r4oqYlyBRvftcahO9rWzt2ghV2N8bnghctbswPymCJfESC');
	config.set('twitterCallbackURL', config.get('rootUrl') + '/api/login/twitter/return');
	config.set('apiSecret', '60dd06aa-cf8e-4cf8-8925-6de720015ebf');
	config.set('foursquareSecret', '2FOV20XOFIE1YJGDPNCEKK4RXU4DP553JTZVAQ2FCXK5YCIY');
	config.set('foursquareClient', 'OWLZJ2IEM2OTIBIGPCCLGZTRJJTRZ25U0Z553DA1N3DOG5U3');

var twitterMiddleWare = require('./server/lib/twitter-middleware/twitter-middleware')(config, Twitter).getInstance();
// Get API routes
var authRoutes = require('./server/routes/auth/auth')(express).getInstance();
var palceRoutes = require('./server/routes/place/place')(express, config, request, twitterMiddleWare).getInstance();
var twitterRoutes = require('./server/routes/twitter/twitter')(express, twitterMiddleWare, config).getInstance();

var api = require('./server/routes/api')(express, authRoutes, palceRoutes, twitterRoutes).getInstance();

// Get instance of app.
var app = require('./server/app/app')(express, bodyParser, expressSession, path, api, config).getInstance();

/**
 * Listen on provided port, on all network interfaces.
 */
http.createServer(app).listen(app.get('port'), () => console.log(`API running on localhost:${app.get('port')}`));