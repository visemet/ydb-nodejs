
/*
 * GET demo.
 */

exports.load = function(req, res) {
  var demoNo = req.params.no;

  res.render('demo', {
    title: 'Demo #' + demoNo + ' - YoctoDB'
  , scripts: getScripts(demoNo)
  });
};

function getScripts(demoNo) {
  switch(demoNo) {
  case '1':
    return [
      '/javascripts/gray-visual-theme.js'
    , '/javascripts/moving-average.js'
    ];
  case '2':
    return [
      '/javascripts/gray-visual-theme.js'
    , '/javascripts/combined-moving-average.js'
    ];
  }
};
