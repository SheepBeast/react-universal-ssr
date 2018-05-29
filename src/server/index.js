require('babel-register')

var express = require('express')
var path = require('path')
var axios = require('axios')
var crypto = require('crypto')
var bodyParser = require('body-parser')
var NodeRSA = require('node-rsa')
var React = require('react')
var { renderToString } = require('react-dom/server')
var { StaticRouter } = require('react-router-dom')

var configureStore = require('../store').default
var App = require('../containers/App').default
var API = require('../api').default

var server = express()
var api = new API()

var publicKey = require('../pem/rsa_public_key.pem')

server.set('views', __views)
server.set('view engine', 'ejs')

var contentTypes = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.png': 'image/png',
  '.jpg': 'image/jpg'
}


server.use(require('morgan')('dev', {
  skip: function (req, res) {
    return res.statusCode < 400
  }
}))


server.use(bodyParser.urlencoded({ extended: false }))

server.use(bodyParser.json())

server.use('/assets', express.static(__assets, {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['html', 'css', 'png', 'jpg', 'js'],
  maxAge: '3600000',
  redirect: true,
  setHeaders: function (res, pathname, stat) {
    res.set('x-timestamp', Date.now())
    res.set('Vary', 'Accept-Encoding')
    res.set('Cache-Control', 'assets, max-age=3600')

    var ext = path.extname(pathname)
    res.set('Content-Type', contentTypes[ext])
  }
}))

server.get('/test', function (req, res) {
  res.send('ok')
})

server.get('/', function (req, res) {
  var html = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  )
  var store = configureStore()

  // console.log('req url -->', req.url, html)

  res.render('index', { html, state: store.getState() })
})

server.get('/Statistic', function (req, res) {
  var html = renderToString(
    <StaticRouter location={req.url} context={{}}>
      <App />
    </StaticRouter>
  )
  var store = configureStore()

  res.render('index', { html, state: store.getState() })
})



server.post('/login', async (req, res) => {
  // console.log('headers -->', req.headers)
  console.log('login -->', req.body)

  var { method, data: { username, password } } = req.body

  var md5 = crypto.createHash('md5')

  md5.update(password)

  var md5Sign = md5.digest('hex').toUpperCase()

  console.log('md5 -->', md5Sign)


  let rsaKey = new NodeRSA(publicKey, 'pkcs8-public-pem')

  rsaKey.setOptions({
    encryptionScheme: 'pkcs1',
    signingScheme: 'pkcs1',
    mode: 'ecb'
  })

  let encrypted = rsaKey.encrypt(md5Sign, 'base64')

  console.log('rsa -->', encrypted)

  let ret = await api.fetch(method, { userName: username, password: encrypted })

  res.send(ret.data)
})

var port = process.env.NODE_ENV === "production" ? 1501 : 8081

server.listen(port, function () {
  console.log('Listenning on port: ' + port)
})