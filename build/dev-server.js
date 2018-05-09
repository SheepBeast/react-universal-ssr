const path = require('path')
const express = require('express')

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.client.dev.conf')
  const compiler = webpack(config)

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
  app.use(webpackHotMiddleware(compiler))
  

  app.get('/', function(req, res) {
    res.sendFile('index.html')
  })

}

app.listen(8080, function() {
  console.log(`Listening at http://localhost:8080`)
})
