
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , net = require('net')
  , bert = require('node-bertrpc/src/bert.js')
  , path = require('path')
  , redis = require('redis');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

app.get('/', routes.index);
app.get('/stream', routes.stream);

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});

var publisher = redis.createClient();

net.createServer(function(sock) {
  sock.setEncoding('binary');

  // We have a connection - a socket object is assigned to the
  // connection automatically
  console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort);

  // Add a 'data' event handler to this instance of socket
  sock.on('data', function(data) {
    try {
      var raw = data.toString('binary')
        , term = bert.decode(raw);

      publisher.publish('updates', JSON.stringify(term));
      console.log(term);
    } catch (err) {
      console.error(err);
    }
  });

  // Add a 'close' event handler to this instance of socket
  sock.on('close', function(data) {
    console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort);
  });
}).listen(2158);
