var path = require('path')
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')
var htmlStringReplaceWebpackPlugin = require('html-string-replace-webpack-plugin')
var stringReplaceWebpackPlugin = require("string-replace-webpack-plugin");

module.exports = {
  entry: {
    app: [
      // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000', 
      './src/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'assets/[name].js',
    chunkFilename: '[name].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['.js', '.json']
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
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /index.html$/,
        loader: stringReplaceWebpackPlugin.replace({
          replacements: [{
            pattern: /<!-- html -->/g,
            replacement: function(match) {
              console.log('replace html -->', match)
              return '<%- html -%>'
            }
          }, {
            pattern: /<!-- state -->/g,
            replacement: function(match) {
              console.log('replace state -->', match)
              return '<script type="text/javascript">window._INITIAL_STATE_ = <%- JSON.stringify(state) %></script>'
            }
          }]
        })
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      }
    ]
  },
  mode: 'development',
  plugins: [
    new htmlWebpackPlugin({
      filename: './views/index.ejs',
      template: './src/server/views/index.html',
      inject: true
    }),
    new stringReplaceWebpackPlugin(),
    
    // new htmlStringReplaceWebpackPlugin({
    //   enable: true,
    //   patterns: [
    //     {
    //       match: /(\<\!\-\-\s+html\s+\-\-\>)/g,
    //       replacement: function (match) {
    //         return `<%- html %>`
    //       }
    //     },
    //     {
    //       match: /\<\!\-\-\s+state\s+\-\-\>/g,
    //       replacement: function (match) {
    //         return `<script>window._INITIAL_STATE_ = <%- JSON.stringify(state) %></script>`
    //       }
    //     }]
    // }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}