
exports.make = function(options) {

  Highcharts.setOptions({
    global : {
      useUTC : false
    }
  });

  // Create the chart
  window.chart = new Highcharts.StockChart({
    chart: {
      renderTo: 'container'
    }

  , rangeSelector: options.rangeSelector

  , title : options.title

  , series : options.series
  });

};
