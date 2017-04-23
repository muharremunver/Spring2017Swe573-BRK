var Router = function(express, authRoutes, palceRoutes){

	var instance;

	function init () {

		const router = express.Router();

		router.get('/health', (req, res) => {
  			res.send({code:200, message: 'I am alive'});
		});

		// Inject external routes.
		router.use('/', authRoutes);
		router.use('/', palceRoutes);

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