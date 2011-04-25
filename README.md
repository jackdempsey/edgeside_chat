# Welcome to the Edgeside Chat with Node, Rails 3, Coffescript, and Socket.io

This example app exists mostly as a rewrite and port of the excellent example from the folks at [LearnBoost](http://learnboost.com)

I wanted to give a real example of how you could make use of Sprockets and CoffeeScript in Rails 3.1, and this chat example was a lot of fun.


## Requirements

* node
* rails 3.1

### Getting Started


1. If you haven't already, clone the app down to your local machine:
    $ git clone git://github.com/jackdempsey/edgeside_chat.git

2. Change directory to <tt>edgeside_chat</tt> and start the web server:
       <tt>cd edgeside_chat; rails s</tt>

3. Open up another shell and run the server:
    $ node app/assets/javascripts/chat_server.js

4. Go to http://localhost:3000/ and you'll see the app. Type something in as a test.

5. Open up a new browser window, load http://localhost:3000, and type something else. You should see messages appear on both sides. Neat, huh?

6. That's about it for now. Some related tips/notes to follow

### Tips, Tricks, and "Oh yeahs..."


#### CoffeeScript


1. If your JS looks like:

  ```javascript
    if ('foo' in bar)
      ...
  ```

  then your CoffeeScript should look like:

  ```coffeescript
    if 'foo' of bar
      ...
  ```

  That one tripped me up several times, and was easy to overlook. You'll see some commits dedicated to just it in the history.

2. Remember, CoffeeScript files are automatically wrapped in a closure. If you define some functions in a .coffee file, and trying to access them gives you an Undefined, set them on window:

  ```coffeescript
    window.foo = -> console.log "Hey There."
  ```

3. CoffeeScript also doesn't know about your document being ready. Remember kids, JavaScript is not just for image rollovers anymore. If things aren't working right, check and see if you 
wrapped your code in a call to $:

  ```coffeescript
    $ ->
    window.foo = -> console.log "This should run when the DOM is ready."
  ```

License

(The MIT License)

Copyright (c) 2011 Jack Dempsey <jack.dempsey@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF ORe rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 


This example relies heavily on some great work from LearnBoost, and their license is thusly included:

License

(The MIT License)

Copyright (c) 2010 LearnBoost <dev@learnboost.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF ORfy, merge, publish, distribute, sublicense, and/or sell copies of the Software
