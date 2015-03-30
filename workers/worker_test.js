var jackrabbit = require('jackrabbit');
var mongo = require('mongodb');

// Connection URL
var mongoUrl = 'mongodb://localhost:27017/test';
var rabbitUrl = 'amqp://localhost';
var rabbitQueue = 'jobs.add';

mongo.connect(mongoUrl, function(err, db) {
  if (err)
  {
    console.log("Error connecting to MongoDB: " + err);
    process.exit(1);
  }

  console.log("Connected to MongoDB: " + mongoUrl);
  var queue = jackrabbit(rabbitUrl);

  queue.on('connected', function() {
    console.log("Connected to rabbitMQ: " + rabbitUrl);

    queue.create(rabbitQueue, { }, onReady);

    function onReady() {
      console.log("Listening to " + rabbitQueue);
      queue.handle(rabbitQueue, onJob);
    }

    function onJob(job, ack) {
      console.log('Got message: ' + job.toString());
      var obj = JSON.parse(job);
      var objID = insertDocument(obj, db, function(err, result) {
        if (err) { console.log("Error inserting document: " + err); return;}
        var objID = obj._id.toHexString();
        console.log('Inserted ' + result + ", objID= " + objID);
        ack(objID);
        console.log("Ack sent: " + objID);
      });
      //process.exit();
    };
  });

});

var insertDocument = function(obj, db, callback) {
  // Get the documents collection
  console.log("Called insertDocument for " + JSON.stringify(obj));

  var collection = db.collection('documents');
  // Insert some documents
  collection.insert(obj, callback);
};
