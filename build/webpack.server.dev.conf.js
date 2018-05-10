var path = require('path')
var webpack = require('webpack')
var webpackNodeExternals = require('webpack-node-externals')

var dist = path.resolve(__dirname, '../dist')

module.exports = {
  entry: {
    index: './src/server/index.js'
  },
  output: {
    path: dist,
    filename: '[name].js'
  },
  target: 'node',
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json']
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      },
      {
        test: /\.less$/,
        loader: 'css-loader!less-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__views': JSON.stringify(path.join(process.cwd(), './dist/views')),
      '__assets': JSON.stringify(path.join(process.cwd(), './dist/assets')),
      '__TERMINAL__': '"server"',
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
  ]
}