var Webpack = require('webpack')
var WebpackMerge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var COMMON_CLIENT_CONFIG = require('./webpack.common.client.conf')

module.exports = WebpackMerge(COMMON_CLIENT_CONFIG, {
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000',
      './src/index.js'
    ]
  },
  output: {
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/[name].js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      }
    ]
  },
  mode: 'development',
  // devtool: 'cheap-eval-source-map',
  plugins: [
    new Webpack.DefinePlugin({
      '__REMOTE_SERVER__': '"https://t.server.wisbetter.com"',
      '__PROXY_SERVER__': '"/api"',
      '__MIDDLEWAVE_SERVER__': '"/local"'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/server/views/index.html',
      favicon: './src/assets/baidu.ico'
    }),
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
})