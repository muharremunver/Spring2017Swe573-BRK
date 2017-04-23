var App = function(express, bodyParser, expressSession, path, api, config){

	var instance;

	function init () {

		var app = express();

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));

		/**
		 * Configure Passport.
		 */
		var initialisedPassport = passport.initialize();
		var passportSession = passport.session();

		passport.serializeUser( ( user, cb ) => {
			cb(null, user);
		});

		passport.deserializeUser( ( obj, cb ) => {
			cb(null, obj);
		});


		/**
		 *	Configure session.
		 */
		var session = expressSession( {
  			secret: config.get('apiSecret'),
  			resave: false,
  			saveUninitialized: false,
  			name: 'sid'
		});

		app.use(session);
		app.use(initialisedPassport);
		app.use(passportSession);

		passport.use( new PassportTwitter( {
			consumerKey: config.get('consumerKey'),
			consumerSecret: config.get('consumerSecret'),
			callbackURL: config.get('twitterCallbackURL')
		},
		(accessToken, refreshToken, profile, cb ) => {

			config.set('accessToken', accessToken);
			config.set('refreshToken', refreshToken);

			return cb( null, profile );
		}));


		// Point static path to dist.
		app.use(express.static(path.join(config.get('rootPath'), 'dist')));

		// Set api routes.
		app.use('/api', api);

		// Catch all other routes and return the index file.
		app.get('*', (req, res) => {
		  res.sendFile(path.join(config.get('rootPath'), 'dist', 'index.html'));
		});
		
		/**
 		 * Get port from environment and store in Express.
 		 */
		app.set('port', config.get('port'));


		return app;
	};

	return {
		getInstance: function (){
			if (!instance)
				instance = init();

			return instance;
		}
	};

};

module.exports = exports = App;