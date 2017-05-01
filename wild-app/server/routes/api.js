var Router = function(express, authRoutes, palceRoutes, twitterRoutes){

	var instance;

	function init () {

		const router = express.Router();

		router.get('/health', (req, res) => {
  			res.send({code:200, message: 'I am alive'});
		});

		// Inject external routes.
		router.use('/', authRoutes);
		router.use('/', palceRoutes);
		router.use('/', twitterRoutes);

		return router;
	};

	return {
		getInstance: function (){
			if (!instance)
				instance = init();

			return instance;
		}
	};

};

module.exports = Router;