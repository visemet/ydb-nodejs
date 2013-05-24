
/**
 * Module dependencies.
 */

var redis = require('heroku-redis-client')
  , bert = require('node-bertrpc/src/bert.js')
  , chart = require('../chart.js');

var publisher = redis.createClient();

/*
 * GET demo.
 */

exports.load = function(req, res) {
  var demoNo = req.params.no;

  res.render('demo', {
    title: 'YoctoDB'
  , chart: chart.make
  , chartOptions: getChartOptions(demoNo)
  , chartUpdate: getChartUpdate(demoNo)
  });
};

function getChartOptions(demoNo) {
  var options = {};

  switch(demoNo) {
  case '1':
    options = chartOptions1();
    break;
  }

  return options;
}

function getChartUpdate(demoNo) {
  switch(demoNo) {
  case '1':
    return  chartUpdate1();
  }
}

function chartOptions1() {
  return {
    rangeSelector: {
      buttons: [
        {
          count: 1
        , type: 'minute'
        , text: '1M'
        }
      , {
          count: 5
        , type: 'minute'
        , text: '5M'
        }
      , {
          type: 'all'
        , text: 'All'
        }
      ]
    , inputEnabled: false
    , selected: 0
    }
  , title: {
      text: 'Demo #1'
    }
  , series: [
      {
        name: 'Electricity usage (kWh)'
      , data: []
      }
    ]
  };
};

function chartUpdate1() {
  return function() {
    var source = new EventSource(window.location.pathname + '/stream')
      , chart = window.chart;

    source.addEventListener('message', function(e) {
      var data = JSON.parse(e.data);

      data.forEach(function(datum) {
        var timestamp = datum[1] / 1e6 // convert to seconds
          , watts = datum[2][0];

        chart.series[0].addPoint([timestamp, watts], true, false, false);
      });
    }, false);
  };
}

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
