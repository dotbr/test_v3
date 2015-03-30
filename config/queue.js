exports.default = {
  queue: function(api){
    return {
        enable: true,
        host: 'amqp://localhost'
    }
  }
}
