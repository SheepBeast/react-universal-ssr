const path = require('path')
const express = require('express')
const serveFavicon = require('serve-favicon')

const app = express();

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const httpProxyMiddleware = require('http-proxy-middleware')

const webpackClientDevConfig = require('./webpack.client.dev.conf')
const compiler = webpack(webpackClientDevConfig)

const devConfig = require('../config/dev.conf')

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackClientDevConfig.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

Object.keys(devConfig.proxyTable).forEach(key => {
  app.use(key, httpProxyMiddleware(devConfig.proxyTable[key]))
})

app.use(serveFavicon(path.join(__dirname, '../src/assets/baidu.ico')))

app.get('/', function (req, res) {
  res.sendFile('index.html')
})


app.listen(8080, function () {
  console.log(`Listening at http://localhost:8080`)
})
