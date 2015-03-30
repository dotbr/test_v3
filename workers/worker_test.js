var jackrabbit = require('jackrabbit');
var mongo = require('mongodb');

// Connection URL
var url = 'mongodb://localhost:27017/test';
// Use connect method to connect to the Server
var mongoDB;

mongo.connect(url, function(err, db) {
  if (err)
  {
    console.log("Error connecting to MongoDB: " + err);
    process.exit(1);
  }

  mongoDB = db;
  console.log("Connected to MongoDB: " + url);

});

var insertDocument = function(obj, db, callback) {
  // Get the documents collection
  console.log(callback);

  var collection = db.collection('documents');
  // Insert some documents
  collection.insert(obj, callback);
};

var queue = jackrabbit('amqp://localhost');

queue.on('connected', function() {
  queue.create('jobs.add', { prefetch: 5 }, onReady);

  function onReady() {
    queue.handle('jobs.add', onJob);
  }

  function onJob(job, ack) {
    console.log('Inserting ' + job.toString());
    var obj = JSON.parse(job);
    var objID = insertDocument(obj, mongoDB, function(err, result) {
      if (err) return;
      console.log('Inserted ' + result + ", objID= " + obj._id);
      var objID = obj._id.toHexString();
      console.log("Sending ack: " + objID);
      ack(objID);
    });
    //process.exit();
  };
});
