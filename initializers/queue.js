var jack = require('jackrabbit');

module.exports = {
  initialize: function(api, next) {

    api.queue = {

      enable: api.config.queue.enable,
      client: {},

      connect: function(err) {
        var connection = jack(api.config.queue.host);
        connection.on('connected', function() {
          api.log('AMQP connected to ' + api.config.queue.host, 'notice');
          api.queue.client = connection;
          next();
        });
        connection.on('disconnected', function(err) {
          api.log('AMQP disconnected', 'warning');
          api.queue.client = {};
          next(err);
        });
      }
    };

    next();
  },

  startPriority: 1003, // the lowest post-core middleware priority
  start: function(api, next){
    api.queue.connect(function(err){
      next(err);
    });
  }
};
