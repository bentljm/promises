/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var ps = require ('./promisification.js');
var psc = require ('./promiseConstructor.js');
Promise.promisifyAll(fs);

var writeFileAsync = Promise.promisify(fs.writeFile);

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return psc.pluckFirstLineFromFileAsync (readFilePath)
  .then (function (username) {
    return ps.getGitHubProfileAsync(username);
  })
  .then (function (body) {
    //console.log('body that is passed in is: ', body)
    var stringifiedBody = JSON.stringify(body);
    //console.log('the stringified version is: ', stringifiedBody);
    //console.log("hello world");
    return writeFileAsync(writeFilePath, stringifiedBody);
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};