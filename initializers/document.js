// initializers/document.js
var amqp = require('amqplib/callback_api');
var basename = require('path').basename;
var uuid = require('node-uuid');

module.exports = {

  initialize: function(api, next){

    api.safedoc = {

      // constants

      collection: "documents",

      // documents

      documentAdd: function(userName, content, next){
        api.queue.client.create('jobs.add', { prefetch: 1 }, onReady);

        function onReady() {
          api.log('Published job from ' + userName + ": " + content);
          api.queue.client.publish('jobs.add', content, replyHandler);
          //next();
        };

        function replyHandler(err, msg) {
          if (err) api.log("Error waiting for a reply: " + err);
          api.log('Received reply from job: ' + msg);
          next(err,msg);
        };

      },

      documentSearch: function(userName, next){
        var self = this;
        var search = self.postPrefix + self.separator + userName + self.separator;
        redis.keys(search+"*", function(error, keys){
          var titles = [];
          var started = 0;
          keys.forEach(function(key){
            var parts = key.split(self.separator);
            var k = parts[(parts.length - 1)];
            titles.push(k);
          });
          titles.sort();
          next(error, titles);
        });
      }
    };

    next();

  },

  loadPriority:  1002,
  startPriority: 1002,
  stopPriority:  1002,
};
