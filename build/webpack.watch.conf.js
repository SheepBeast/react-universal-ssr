var path = require('path')

var Webpack = require('webpack')
var WebpackMerge = require('webpack-merge')

var SERVER_COMMON_CONFIG = require('./webpack.server.common.conf')

module.exports = WebpackMerge(SERVER_COMMON_CONFIG, {
  output: {
    path: path.resolve(__dirname, '../cache')
  },
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 500,
    ignored: /node_modules/
  },
  mode: 'development',
  plugins: [
    new Webpack.DefinePlugin({
      '__views': JSON.stringify(path.join(process.cwd(), './cache/views')),
      '__assets': JSON.stringify(path.join(process.cwd(), './cache/assets')),
      '__TERMINAL__': '"server"',
      'process.env': {
        'NODE_ENV': '"development"'
      }
    })
  ]
})