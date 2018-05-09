var path = require('path')
var axios = require('axios')
var express = require('express')
var React = require('react')
var { renderToString } = require('react-dom/server')
var { StaticRouter } = require('react-router-dom')
var { Provider } = require('react-redux')

var routes = require('../routes').default
var store = require('../store').default

var App = require('../App').default

var app = express()

app.set('views', __views)
app.set('view engine', 'ejs')

var contentTypes ={
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.png': 'image/png',
  '.jpg': 'image/jpg'
}

app.use('/assets',express.static(__assets, {
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


app.get('/', function (req, res) {
  console.log('listening --> get /')

  var html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  console.log('listening --> html /', html)

  res.render('index', { html, state: store.getState() })
})

app.get('/home', function (req, res) {
  console.log('listening --> get /home')

  var html = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        {routes}
      </StaticRouter>
    </Provider>
  )

  console.log('listening --> html /home', html)

  res.render('index', { html, state: store.getState() })
})

app.listen(8081, function () {
  console.log('Listenning on http://localhost:8081')
})