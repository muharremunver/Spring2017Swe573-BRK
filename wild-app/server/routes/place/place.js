var Place = function(express, config, request){

  var instance;

  function init() {

    var router = express.Router();

    // Get list of places with specified location.
    router.get('/places', (req, res) => {

      var foursquareURL = 'https://api.foursquare.com/v2/venues/search';
      foursquareURL += '?ll=' + req.query.lat +','+ req.query.long;
      foursquareURL += '&intent=browse&radius=5000&limit=75&categoryId=4bf58dd8d48988d1e4941735';
      foursquareURL += '&client_secret=' + config.get('foursquareSecret');
      foursquareURL += '&client_id=' + config.get('foursquareClient');
      foursquareURL += '&v=20170304';

      var options = {  
        url: foursquareURL,
        method: 'GET'
      };

      request(options, function(err, resp, body) {  
        
        if(err) {

          if(error.stack) {
            
            console.log(error.stack);
            res.send({code:500, message:'FAIL_SYSTEM', data:error.message});
            return;
          }

          res.send({code:500, message:'FAIL_SYSTEM', data:error});
          return;
        }

        var venues = JSON.parse(body).response.venues;
        var retVal = [];

        venues.forEach((venue) => {
          
          retVal.push({
            id: venue.id,
            name: venue.name,
            latitude: venue.location.lat,
            longitude: venue.location.lng
          });

        });  
        

        res.send({code: 200, message:'SUCCESS', data: retVal});  
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

module.exports = exports = Place;