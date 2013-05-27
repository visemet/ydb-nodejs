
/*
 * Moving average.
 */

$(function() {

  Highcharts.setOptions({
    global : {
      useUTC : true
    }
  });

  var markers = [
      { x: 40 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 73 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 114 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 139 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 175 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 228 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 242 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 308 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 384 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 457 * 60000, title: 'On', text: 'Kettle' }
    , { x: 461 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 461 * 60000, title: 'On', text: 'CD Player' }
    , { x: 473 * 60000, title: 'On', text: 'TV #1' }
    , { x: 484 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 510 * 60000, title: 'On', text: 'Tumble Dryer' }
    , { x: 523 * 60000, title: 'On', text: 'CD Player' }
    , { x: 546 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 552 * 60000, title: 'On', text: 'Vacuum' }
    , { x: 560 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 599 * 60000, title: 'On', text: 'VCR/DVD Player' }
    , { x: 633 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 652 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 704 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 734 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 783 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 808 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 850 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 871 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 919 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 926 * 60000, title: 'On', text: 'VCR/DVD Player' }
    , { x: 946 * 60000, title: 'On', text: 'Hi-Fi' }
    , { x: 955 * 60000, title: 'On', text: 'CD Player' }
    , { x: 1003 * 60000, title: 'On', text: 'VCR/DVD Player' }
    , { x: 1004 * 60000, title: 'On', text: 'Washing Machine' }
    , { x: 1005 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 1014 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 1038 * 60000, title: 'On', text: 'TV #1' }
    , { x: 1089 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 1096 * 60000, title: 'On', text: 'Washing Machine' }
    , { x: 1109 * 60000, title: 'On', text: 'VCR/DVD Player' }
    , { x: 1109 * 60000, title: 'On', text: 'Washing Machine' }
    , { x: 1121 * 60000, title: 'On', text: 'Hob' }
    , { x: 1122 * 60000, title: 'On', text: 'Washing Machine' }
    , { x: 1135 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 1135 * 60000, title: 'On', text: 'Washing Machine' }
    , { x: 1172 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 1185 * 60000, title: 'On', text: 'Kettle' }
    , { x: 1186 * 60000, title: 'On', text: 'CD Player' }
    , { x: 1208 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 1211 * 60000, title: 'On', text: 'VCR/DVD Player' }
    , { x: 1227 * 60000, title: 'On', text: 'TV #1' }
    , { x: 1244 * 60000, title: 'On', text: 'Fridge Freezer' }
    , { x: 1255 * 60000, title: 'On', text: 'Kettle' }
    , { x: 1293 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 1356 * 60000, title: 'On', text: 'Upright Freezer' }
    , { x: 1393 * 60000, title: 'On', text: 'Fridge Freezer' }
  ];

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
      text: 'Moving average of domestic electricity model'
    }

  , exporting: {
      enabled: true
    }

  , series: [
      {
        name: 'Electricity usage (W)'
      , data: []
      , tooltip: {
          valueDecimals: 0
        }
      }
    , {
        type: 'flags'
      , data: []
      , shape: 'squarepin'
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

      while (markers.length !== 0 && time >= markers[0].x) {
        var flag = markers.shift();
        chart.series[1].addPoint(flag, false, false, false);
      }
    });

    chart.redraw();
  }, false);

});
