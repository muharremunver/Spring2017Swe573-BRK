var TwitterRoute = function(express, Twitter, config){

  var instance;

  function init() {

    var router = express.Router();

    // Send tweet.
    router.post('/twitter/send', (req, res) => {

      if (req.body == null || req.body.text == null){

        res.send({code:500, message:'Request body cannot be null!'});
        return;
      }

      var client = new Twitter({
        consumer_key: config.get('consumerKey'),
        consumer_secret: config.get('consumerSecret'),
        access_token_key: config.get('accessToken'),
        access_token_secret: config.get('refreshToken')
      });

      client.post('statuses/update', {status: req.body.text}, function(error, tweet, response) {
        
        if(error) {

          if(error.stack) {
            
            console.log(error.stack);
            res.send({code:500, message:'FAIL_SYSTEM', data:error.message});
            return;
          }

          res.send({code:500, message:'FAIL_SYSTEM', data:error});
          return;
        }

        res.send({code: 200, message:'SUCCESS'});  
        return;

      });

    });

    // Gets profile info. of specified user.
    router.get('/twitter/profile', (req, res) => {

      if(!req.query.id) {

        res.send({code:500, message:'User id must be provided!'});
        return;
      }

      var client = new Twitter({
        consumer_key: config.get('consumerKey'),
        consumer_secret: config.get('consumerSecret'),
        access_token_key: config.get('accessToken'),
        access_token_secret: config.get('refreshToken')
      });

      client.get('users/show', {user_id: req.query.id}, function(error, profile, response) {
        
        if(error) {

          if(error.stack) {
            
            console.log(error.stack);
            res.send({code:500, message:'FAIL_SYSTEM', data:error.message});
            return;
          }

          if(response.body.code == 50) {

            res.send({code:404, message:'USER_NOT_FOUND'});
            return; 
          }

          res.send({code:500, message:'FAIL_SYSTEM', data:error});
          return;
        }

        res.send({code: 200, message:'SUCCESS', data:profile});  
        return;

      });

    });

    // Follow user.
    router.post('/twitter/follow', (req, res) => {

      if(!req.body.id) {

        res.send({code:500, message:'User id must be provided!'});
        return;
      }

      var client = new Twitter({
        consumer_key: config.get('consumerKey'),
        consumer_secret: config.get('consumerSecret'),
        access_token_key: config.get('accessToken'),
        access_token_secret: config.get('refreshToken')
      });

      client.post('friendships/create', {user_id: req.body.id}, function(error, profile, response) {
        
        if(error) {

          if(error.stack) {
            
            console.log(error.stack);
            res.send({code:500, message:'FAIL_SYSTEM', data:error.message});
            return;
          }

          if(response.body.code == 50) {

            res.send({code:404, message:'USER_NOT_FOUND'});
            return; 
          }

          res.send({code:500, message:'FAIL_SYSTEM', data:error});
          return;
        }

        res.send({code: 200, message:'SUCCESS', data:profile});  
        return;

      });

    });


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

module.exports = exports = TwitterRoute;