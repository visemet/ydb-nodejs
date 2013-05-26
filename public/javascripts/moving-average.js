
/*
 * Moving average.
 */

$(function() {

  Highcharts.setOptions({
    global : {
      useUTC : true
    }
  });

  // Create the chart
  var chart = new Highcharts.StockChart({
    chart: {
      renderTo: 'container'
    }

  , rangeSelector: {
      buttons: [
        {
          count: 30
        , type: 'minute'
        , text: '30m'
        }
      , {
          count: 1
        , type: 'hour'
        , text: '1h'
        }
      , {
          count: 2
        , type: 'hour'
        , text: '2h'
        }
      , {
          count: 4
        , type: 'hour'
        , text: '4h'
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
      text: 'Moving average'
    }

  , exporting: {
      enabled: true
    }

  , yAxis: {
      plotLines: [
        {
          value: 190
        , color: 'purple'
        , dashStyle: 'shortdash'
        , width: 2
        , label: {
            text: 'Fridge freezer'
          , align: 'right'
          , style: {
              color: 'white'
            , fontWeight: 'bold'
            }
          }
        }
      , {
          value: 155
        , color: 'purple'
        , dashStyle: 'shortdash'
        , width: 2
        , label: {
            text: 'Upright freezer'
          , align: 'right'
          , style: {
              color: 'white'
            , fontWeight: 'bold'
            }
          }
        }
      , {
          value: 1000
        , color: 'purple'
        , dashStyle: 'shortdash'
        , width: 2
        , label: {
            text: 'Iron'
          , align: 'right'
          , style: {
              color: 'white'
            , fontWeight: 'bold'
            }
          }
        }
      , {
          value: 2000
        , color: 'purple'
        , dashStyle: 'shortdash'
        , width: 2
        , label: {
            text: 'Vacuum'
          , align: 'right'
          , style: {
              color: 'white'
            , fontWeight: 'bold'
            }
          }
        }
      , {
          value: 124
        , color: 'purple'
        , dashStyle: 'shortdash'
        , width: 2
        , label: {
            text: 'TV 1'
          , align: 'right'
          , style: {
              color: 'white'
            , fontWeight: 'bold'
            }
          }
        }
      , {
          value: 2400
        , color: 'purple'
        , dashStyle: 'shortdash'
        , width: 2
        , label: {
            text: 'Hob'
          , align: 'right'
          , style: {
              color: 'white'
            , fontWeight: 'bold'
            }
          }
        }
      , {
          value: 2125
        , color: 'purple'
        , dashStyle: 'shortdash'
        , width: 2
        , label: {
            text: 'Oven'
          , align: 'right'
          , style: {
              color: 'white'
            , fontWeight: 'bold'
            }
          }
        }
      , {
          value: 1250
        , color: 'purple'
        , dashStyle: 'shortdash'
        , width: 2
        , label: {
            text: 'Microwave'
          , align: 'right'
          , style: {
              color: 'white'
            , fontWeight: 'bold'
            }
          }
        }
      , {
          value: 2500
        , color: 'purple'
        , dashStyle: 'shortdash'
        , width: 2
        , label: {
            text: 'Tumble dryer'
          , align: 'right'
          , style: {
              color: 'white'
            , fontWeight: 'bold'
            }
          }
        }
      , {
          value: 406
        , color: 'purple'
        , dashStyle: 'shortdash'
        , width: 2
        , label: {
            text: 'Washing machine'
          , align: 'right'
          , style: {
              color: 'white'
            , fontWeight: 'bold'
            }
          }
        }
      ]
    }

  , series: [
      {
        name: 'Electricity usage (kWh)'
      , type: 'areaspline'
      , data: []
      , gapSize: 5
      , tooltip: {
          valueDecimals: 0
        }

      , fillColor: {
          linearGradient: {
            x1: 0
          , y1: 0
          , x2: 0
          , y2: 1
          }

        , stops: [
            [0, Highcharts.getOptions().colors[0]]
          , [1, 'rgba(0,0,0,0)']
          ]
        }
      }
    ]
  });

  var source = new EventSource(window.location.pathname + '/stream');

  source.addEventListener('message', function(e) {
    var data = JSON.parse(e.data);

    data.forEach(function(datum) {
      var time = datum[1] / 1e3 // convert to milliseconds
        , watts = datum[2][0];

      chart.series[0].addPoint([time, watts], false, false, false);
    });

    chart.redraw();
  }, false);

});
