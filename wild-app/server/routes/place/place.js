var PlaceRoute = function(express, config, request, Twitter){

  var instance;

  function init() {

    var router = express.Router();

    // Get list of places with specified location.
    router.get('/places', (req, res) => {

      if(!req.query.lat || !req.query.long) {

        res.send({code:500, message:'Place location must be provided!'});
        return;
      }


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

      request(options, (error, resp, body) => {  
        
        if(error) {

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

    // Get tweets of specified place.
    router.get('/places/detail/', (req, res) => {

      var client = new Twitter({
        consumer_key: config.get('consumerKey'),
        consumer_secret: config.get('consumerSecret'),
        access_token_key: config.get('accessToken'),
        access_token_secret: config.get('refreshToken')
      });

      var query = '';
      var geocode = req.query.lat +','+ req.query.long +','+ '5km';
      client.get('search/tweets', {q: query, geocode: geocode}, function(error, tweets, response) {
        
        if(error) {

          if(error.stack) {
            
            console.log(error.stack);
            res.send({code:500, message:'FAIL_SYSTEM', data:error.message});
            return;
          }

          res.send({code:500, message:'FAIL_SYSTEM', data:error});
          return;
        }

        // make refinement
        var tweets = JSON.parse(response.body).statuses;
        var retVal = {tweets: tweets, media: []};

        tweets.forEach((item) =>{

          // check twitter images
          if(item.entities && item.entities.media && item.entities.media.length > 0) {

            item.entities.media.forEach((media) => {

              retVal.media.push({
                src: media.media_url,
                visible: false
              });

            });

          } 
          // check instagram photos
/*          else if (item.source && item.source.indexOf('instagram.com') != -1){

            if(item.entities && item.entities.urls && item.entities.urls.length > 0){

              item.entities.urls.forEach((media) => {

                if(media.expanded_url.indexOf('instagram.com') != -1){

                  retVal.media.push({
                    src: media.expanded_url,
                    visible: false
                  });
                }

              });

            }
          }
*/
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

module.exports = exports = PlaceRoute;