var AuthRoute = function(express){

  var instance;

  function init() {

    var router = express.Router();

    // Twitter login end point.
    router.get('/login/twitter', passport.authenticate('twitter'));

    // Twitter auth. callback end point.
    router.get('/login/twitter/return', passport.authenticate('twitter', { failureRedirect: '/login' } ),
      (req, res) => {
        res.redirect('/map');
      }
    );


    return router;
  }

  return {

    getInstance: function () {

      if ( !instance )
        instance = init();

      return instance;
    }

  };

};

module.exports = exports = AuthRoute;