var TwitterMiddleware = function(config, Twitter){

  var instance;

  function init() {

    var client = new Twitter({
      consumer_key: config.get('consumerKey'),
      consumer_secret: config.get('consumerSecret'),
      access_token_key: config.get('accessToken'),
      access_token_secret: config.get('refreshToken')
    });

    return client;
  }

  return {

    getInstance: function () {

      if ( !instance )
        instance = init();

      return instance;
    }

  };

};

module.exports = exports = TwitterMiddleware;