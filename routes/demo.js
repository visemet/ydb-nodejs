
/**
 * Module dependencies.
 */

var redis = require('heroku-redis-client')
  , bert = require('node-bertrpc/src/bert.js');

var publisher = redis.createClient();

/*
 * GET demo.
 */

exports.load = function(req, res) {
  var demoNo = req.params.no;

  res.render('demo', {
    title: 'YoctoDB'
  , scripts: [
      '/javascripts/live-graph-' + demoNo + '.js'
    , '/javascripts/data-stream-' + demoNo + '.js'
    ]
  });
};

/*
 * POST demo.
 */

exports.update = function(req, res) {
  var demoNo = req.params.no;

  try {
    var data = req.body.data
      , raw = toRaw(data)
      , term = bert.decode(raw);

    publisher.publish('updates ' + demoNo, JSON.stringify(term));
  } catch (err) {
    console.error(err);
  }

  res.send(200);
};

/*
 * Returns a binary-encoded string that is recognized by BERT-JS.
 */
function toRaw(data) {
  var sliced = data.slice('<<'.length, -'>>'.length)
    , split = sliced.split(',')
    , mapped = split.map(function(num) {
        return String.fromCharCode(parseInt(num, 10));
      })

    , joined = mapped.join('');

  return joined;
};
