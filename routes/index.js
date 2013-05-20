
/**
 * Module dependencies.
 */

var redis = require('heroku-redis-client');

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { title: 'YoctoDB' });
};
