var PlaceRoute = function(express, config, request, twitterClient, _, async){

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

    // Get tweets of specified place from Twitter.
    router.get('/places/detail/', (req, res) => {

      if(!req.query.lat || !req.query.long) {

        res.send({code:500, message:'Place location must be provided!'});
        return;
      }
      
      var query = 'camp OR camping OR nature OR tent OR kamp OR kamping OR trekking OR doğa OR çadır';
      var geocode = req.query.lat +','+ req.query.long +','+ '5km';

      twitterClient.get('search/tweets', {q: query, geocode: geocode}, function(error, tweets, response) {
        
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
        var users = [];

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

          // create user list for credibility.
          if(_.findIndex(users, {'ID': item.user.id}) == -1){

            users.push({
              ID: item.user.id,
              credibility: 0
            });
          }

        });

        // Calculate credibility of users and sort tweet array according to result.
        var keywords = ['camp','camping','nature','tent','kamp','kamping','trekking','doğa','çadır'];
        
        async.each(users, (user, callback)=> {

          var profileQuery = {
            include_entities: true,
            include_rts: true,
            user_id: user.ID
          };
          twitterClient.get('statuses/user_timeline', profileQuery, function(error, userTweets, response) {

            if(userTweets.length != undefined){

              userTweets.forEach((userTweet) => {

                keywords.forEach((keyword) =>{

                  if(userTweet.text.indexOf(keyword) != -1)
                    user.credibility +=1;
                });
              });
              callback(null);
            } else{
              callback(null);
            }

          });
        }, (err)=> {

          if(err){
            
            res.send({code:500, message:'FAIL_SYSTEM', data:err});
            return;
          }

          // Set credibility of each tweet.
          retVal.tweets.forEach((tweet)=> {

            var user = _.find(users, {'ID': tweet.user.id});
            var credibility = user.credibility;
            tweet['credibility'] = credibility;
          });

          // Sort tweets according to their credibility.
          retVal.tweets = _.orderBy(retVal.tweets, ['credibility'], ['desc']);
          
          res.send({code: 200, message:'SUCCESS', data: retVal});  
          return;
            
        });
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