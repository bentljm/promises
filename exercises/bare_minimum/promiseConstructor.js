// /**
//  * Implement these promise-returning functions.
//  * Any successful value should be made available in the next `then` block chained
//  * to the function invocation, while errors should be available in the `catch` block
//  */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

var nodeStyle = require('./callbackReview.js');

var pluckFirstLineFromFileAsync = Promise.promisify(nodeStyle.pluckFirstLineFromFile);
var getStatusCodeAsync = Promise.promisify(nodeStyle.getStatusCode);

// // This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function (filePath) {
  return new Promise (function (resolve, reject) {
    fs.readFile(filePath, 'utf8', function (err, content) {
      if (err) {
        reject (err);
      } else {
        var lines = content.split('\n');
        resolve (lines[0]);
      }
    });
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  return new Promise (function (resolve, reject) {
    request.get (url, function (error, response) {
      if (error) {
        reject (error);
      } else {
        var statusCode = response.statusCode;
        resolve(statusCode);
      }
    });
  });
};

// // Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
