var path = require('path')
var axios = require('axios')
var express = require('express')
var React = require('react')
var { renderToString } = require('react-dom/server')
var { StaticRouter } = require('react-router-dom')

var configureStore = require('../store').default

var App = require('../App').default

var server = express()

server.set('views', __views)
server.set('view engine', 'ejs')

var contentTypes = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.png': 'image/png',
  '.jpg': 'image/jpg'
}

server.use('/assets', express.static(__assets, {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['html', 'css', 'png', 'jpg', 'js'],
  maxAge: '3600000',
  redirect: true,
  setHeaders: function (res, pathname, stat) {
    console.log('pathname -->', pathname)
    res.set('x-timestamp', Date.now())
    res.set('Vary', 'Accept-Encoding')
    res.set('Cache-Control', 'assets, max-age=3600')

    var ext = path.extname(pathname)
    res.set('Content-Type', contentTypes[ext])
  }
}))


server.get('/', function (req, res) {
  var html = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  )
  console.log('listening --> html /', html)
  var store = configureStore()
  res.render('index', { html, state: store.getState() })
})

server.get('/home', function (req, res) {
  var store = configureStore()
  var html = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  )

  console.log('listening --> html /home', html)
  res.render('index', { html, state: store.getState() })
})

server.listen(8081, function () {
  console.log('Listenning on http://localhost:8081')
})