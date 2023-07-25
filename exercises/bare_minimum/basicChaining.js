/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */
const pluck = require('./promiseConstructor.js');
const getProfile = require('./promisification.js');
var fs = require('fs');
var Promise = require('bluebird');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return pluck.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(user) {
      return getProfile.getGitHubProfileAsync(user);
    })
    .then(function(profile) {
      return new Promise ((resolve, reject) => {
        profile = JSON.stringify(profile);
        fs.writeFile(writeFilePath, profile, (err, profile) => {
          if (err) {
            reject(err);
          } else {
            resolve(profile);
          }
        });
      });
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
