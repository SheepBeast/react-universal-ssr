var WebpackNodeExternals = require('webpack-node-externals')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

var path = require('path')

var assets = './assets'
var assetsPath = function (filename) {
  return path.join(assets, filename)
}

module.exports = {
  entry: {
    index: './src/server/index.js'
  },
  output: {
    filename: '[name].js'
  },
  target: 'node',
  externals: [WebpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'to-string-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: assetsPath('img/[name].[hash:8].[ext]')
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.pem$/,
        loader: 'string-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}