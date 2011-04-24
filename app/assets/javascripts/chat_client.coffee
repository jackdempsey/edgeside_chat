message = (obj) ->
  el = document.createElement 'p'
  if  'announcement' in obj
    el.innerHTML = "<em>#{esc obj.announcement}</em>"
  else if 'message' in obj
    el.innerHTML = "<b>#{esc obj.message[0]}:</b>#{esc obj.message[1]}"
  
  if obj.message && window.console && console.log
    console.log obj.message[0], obj.message[1]

  document.getElementById('chat').appendChild el
  document.getElementById('chat').scrollTop = 1000000

send = ->
  val = document.getElementById('text').value
  socket.send val
  message message: ['you', val]
  document.getElementById('text').value = ''

esc = (msg) -> msg.replace(/</g, '&lt;').replace />/g, '&gt;'

socket = new io.Socket null, port: 3001, rememberTransport: false

socket.connect()

socket.on 'message', (obj) ->
  if 'buffer' of obj
    document.getElementById('form').style.display = 'block'
    document.getElementById('chat').innerHTML = ''
    
    message m for m in obj.buffer
  else
    message obj

socket.on 'connect', ->
  message message: ['System', 'Connected']

socket.on 'disconnect', ->
  message message: ['System', 'Disconnected']

socket.on 'reconnect', ->
  message message: ['System', 'Reconnected to server']

socket.on 'reconnecting', (nextRetry) ->
  message message: ['System', "Attempting to re-connect to the server, next attempt in #{nextRetry} ms"]

socket.on 'reconnect_failed', ->
  message message: ['System', 'Reconnected to server FAILED.']
