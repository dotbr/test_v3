var mongoDB = require('mongodb');

module.exports = {
  initialize: function(api, next) {

    api.mongo = {

      enable: api.config.mongo.enable,
      client: mongoDB.MongoClient,

      connect: function(next) {

        api.log("configuring MongoDB "+api.config.mongo.enable, "notice");

        if (api.config.mongo.enable == true) {
          var url = 'mongodb://'+api.config.mongo.host+':'+api.config.mongo.port+'/'+api.config.mongo.db;

          api.mongo.client.connect(url, function(err, db) {
              if(err) {
                  api.log(err+" error in mongoDB connection", "notice");
                  next();
                  } else {
                      api.log("mongoDB connection ok ", "notice");
                      api.mongo.db = db;
                      next();
                  }
          });
        };
        next();
      }
    };

    next();
  },
  startPriority: 1001, // the lowest post-core middleware priority
  start: function(api, next){
    api.mongo.connect(function(err){
      next(err);
    });
  }
};
