var amqp = require('amqplib/callback_api');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

var insertDocuments = function(obj, db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insert([
    obj
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
}

function bail(err, conn) {
  console.error(err);
  if (conn) conn.close(function() { process.exit(1); });
}

function on_connect(err, conn) {
  if (err !== null) return bail(err);

  process.once('SIGINT', function() { conn.close(); });

  var q = 'object_insert';

  conn.createChannel(function(err, ch) {
    ch.assertQueue(q, {durable: false});
    ch.prefetch(1);
    ch.consume(q, objectInsert, {noAck:false}, function(err) {
      if (err !== null) return bail(err, conn);
      console.log(' [x] Awaiting RPC requests');
    });

    function objectInsert(msg) {
      var msgObject = parseInt(JSON.parse(msg.content.toString()));
      console.log(' [.] objectInsert(%s)', msgObject);

      insertDocuments(msgObject, db, function(result) {
        console.log('Result: %s', result);
        ch.sendToQueue(msg.properties.replyTo,
                       new Buffer(result.toString()),
                       {correlationId: msg.properties.correlationId});
        ch.ack(msg);
        db.close();
      });
    }
  });
}

// Connection URL
var url = 'mongodb://localhost:27017/test';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");

  db.close();
});

amqp.connect(on_connect);
