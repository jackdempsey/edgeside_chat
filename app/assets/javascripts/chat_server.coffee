http = require 'http'
url  = require 'url'
fs   = require 'fs'
io   = require 'socket.io'
sys  = require process.binding('natives').util ? 'util' : 'sys'
    
server = http.createServer (req, res) ->
  # your normal server code
  path = url.parse(req.url).pathname
  switch path
    when '/'
      res.writeHead(200, {'Content-Type': 'text/html'})
      res.write('<h1>Welcome. Try the <a href="/chat.html">chat</a> example.</h1>')
      res.end()
      break
      
    when '/json.js', '/chat.html'
      fs.readFile __dirname + path, (err, data) ->
        return send404(res) if err
        res.writeHead 200,
          'Content-Type': (path == 'json.js' ? 'text/javascript' : 'text/html')
        res.write(data, 'utf8')
        res.end()
      break
      
    else
      send404(res)

send404 = (res) ->
  res.writeHead(404)
  res.write('404')
  res.end()

server.listen 8080

# socket.io, I choose you
# simplest chat application evar
io     = io.listen server
buffer = []
  
io.on 'connection', (client) ->
  client.send
    buffer: buffer
  client.broadcast
    announcement: client.sessionId + ' connected'
  
  client.on 'message', (message) ->
    msg = message: [client.sessionId, message]
    buffer.push(msg)
    buffer.shift() if buffer.length > 15
    client.broadcast(msg)

  client.on 'disconnect', ->
    client.broadcast({ announcement: client.sessionId + ' disconnected' })

