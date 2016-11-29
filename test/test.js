(function() {
'use strict';

var http = require('http');

module.exports = function() {
  
  var url = arguments[0];
  var timeoutInMs = 10000;
  var callback;

  if (typeof(arguments[1]) === 'function') {
    callback = arguments[1]; 
  }

  if (typeof(arguments[1]) === 'number') {
    timeoutInMs = arguments[1];
    callback = arguments[2];
  }

  var request = http.get(url, function handleResponse(res) {

    var body = '';
    res.setEncoding('utf8');

    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      var response = JSON.parse(body);
      callback(null, response);
    });

  }).on('error', function(e) {
    callback(e, null);
  });

  
  request.setTimeout(timeoutInMs, function handleTimeout() {
    callback('timeout exceeded', null);
  });

};

})();