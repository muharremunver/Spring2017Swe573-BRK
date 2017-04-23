var Router = function(express){

	var instance;

	function init () {

		const router = express.Router();

		router.get('/health', (req, res) => {
  			res.send({code:200, message: 'I am alive'});
		});

		router.use('/', require('./auth/auth')(express).getInstance());

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