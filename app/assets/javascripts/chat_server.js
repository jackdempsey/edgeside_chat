(function() {
  var buffer, fs, http, io, send404, server, sys, url;
  http = require('http');
  url = require('url');
  fs = require('fs');
  io = require('socket.io');
  sys = require('sys');
  server = http.createServer(function(req, res) {
    var path;
    path = url.parse(req.url).pathname;
    switch (path) {
      case '/':
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write('<h1>Welcome. Try the <a href="/chat.html">chat</a> example.</h1>');
        res.end();
        break;
      case '/json.js':
      case '/chat.html':
        fs.readFile(__dirname + path, function(err, data) {
          var _ref;
          if (err) {
            return send404(res);
          }
          res.writeHead(200, {
            'Content-Type': (_ref = path === 'json.js') != null ? _ref : {
              'text/javascript': 'text/html'
            }
          });
          res.write(data, 'utf8');
          return res.end();
        });
        break;
      default:
        return send404(res);
    }
  });
  send404 = function(res) {
    res.writeHead(404);
    res.write('404');
    return res.end();
  };
  server.listen(8080);
  io = io.listen(server);
  buffer = [];
  io.on('connection', function(client) {
    client.send({
      buffer: buffer
    });
    client.broadcast({
      announcement: client.sessionId + ' connected'
    });
    client.on('message', function(message) {
      var msg;
      msg = {
        message: [client.sessionId, message]
      };
      buffer.push(msg);
      if (buffer.length > 15) {
        buffer.shift();
      }
      return client.broadcast(msg);
    });
    return client.on('disconnect', function() {
      return client.broadcast({
        announcement: client.sessionId + ' disconnected'
      });
    });
  });
}).call(this);
