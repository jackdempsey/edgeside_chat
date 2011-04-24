(function() {
  var esc, message, socket;
  message = function(obj) {
    var el;
    el = document.createElement('p');
    if ('announcement' in obj) {
      el.innerHTML = "<em>" + (esc(obj.announcement)) + "</em>";
    } else if ('message' in obj) {
      el.innerHTML = "<b>" + (esc(obj.message[0])) + ":</b>" + (esc(obj.message[1]));
    }
    if (obj.message && window.console && console.log) {
      console.log(obj.message[0], obj.message[1]);
    }
    document.getElementById('chat').appendChild(el);
    return document.getElementById('chat').scrollTop = 1000000;
  };
  window.send = function() {
    var val;
    val = document.getElementById('text').value;
    socket.send(val);
    message({
      message: ['you', val]
    });
    return document.getElementById('text').value = '';
  };
  esc = function(msg) {
    return msg.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
  socket = new io.Socket(null, {
    port: 3001,
    rememberTransport: false
  });
  socket.connect();
  socket.on('message', function(obj) {
    var m, _i, _len, _ref, _results;
    if ('buffer' in obj) {
      document.getElementById('form').style.display = 'block';
      document.getElementById('chat').innerHTML = '';
      _ref = obj.buffer;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        m = _ref[_i];
        _results.push(message(m));
      }
      return _results;
    } else {
      return message(obj);
    }
  });
  socket.on('connect', function() {
    return message({
      message: ['System', 'Connected']
    });
  });
  socket.on('disconnect', function() {
    return message({
      message: ['System', 'Disconnected']
    });
  });
  socket.on('reconnect', function() {
    return message({
      message: ['System', 'Reconnected to server']
    });
  });
  socket.on('reconnecting', function(nextRetry) {
    return message({
      message: ['System', "Attempting to re-connect to the server, next attempt in " + nextRetry + " ms"]
    });
  });
  socket.on('reconnect_failed', function() {
    return message({
      message: ['System', 'Reconnected to server FAILED.']
    });
  });
}).call(this);
