function Config(){
  
  var config;
  
  /**
   *  Gets value with specified key.
   */
  this.get = function(key){

    if(!key)
      return null;

    return config[key];
  };

  /**
   * Sets value with specified key.
   */
  this.set = function(key, value){

    if(!key || typeof key != 'string')
      throw new Error('key parameter does not exist or not a string');

    if(typeof value == 'undefined')
      throw new Error('undefined value parameter');

    if(typeof config == 'undefined')
      config = {};

    config[key] = value;

    return true;
  }

  /**
   *  Loads config.
   */
  this.load = function(pathOrObject){

    if(typeof pathOrObject == 'object')
      config = pathOrObject;
    else
      config = require(pathOrObject);

    return true;
  };
};

var ConfigFactory = function(){

  this.getConfig = function(){
    return new Config();
  }
};

module.exports = exports = new ConfigFactory();