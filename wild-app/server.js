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
	request = require('request'),
	keyz = require('../keyz.json');

// Config
var config = require(path.join(__dirname, 'server','lib','config', 'config')).getConfig();
	config.set('rootPath', __dirname);
	config.set('baseUri', keyz.BaseUri);
	config.set('port', 3000);
	config.set('rootUrl', config.get('baseUri') +':' + config.get('port'));
	config.set('twitterConsumerKey', keyz.Twitter.API_KEY);
	config.set('twitterConsumerSecret', keyz.Twitter.API_SECRET);
	config.set('twitterApiSecret', keyz.Twitter.API_SECRET);
	config.set('twitterCallbackURL', config.get('rootUrl') + '/api/login/twitter/return');
	config.set('foursquareClient', keyz.Foursquare.CLIENT_ID);
	config.set('foursquareSecret', keyz.Foursquare.CLIENT_SECRET);

var twitterMiddleWare = require('./server/lib/twitter-middleware/twitter-middleware')(config, Twitter).getInstance();
// Get API routes
var authRoutes = require('./server/routes/auth/auth')(express).getInstance();
var twitterRoutes = require('./server/routes/twitter/twitter')(express, twitterMiddleWare, config).getInstance();
var palceRoutes = require('./server/routes/place/place')(express, config, request, twitterMiddleWare, twitterRoutes).getInstance();

var api = require('./server/routes/api')(express, authRoutes, palceRoutes, twitterRoutes).getInstance();

// Get instance of app.
var app = require('./server/app/app')(express, bodyParser, expressSession, path, api, config).getInstance();

/**
 * Listen on provided port, on all network interfaces.
 */
http.createServer(app).listen(app.get('port'), () => console.log(`API running on localhost:${app.get('port')}`));