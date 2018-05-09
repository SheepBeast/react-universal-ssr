var path = require('path')
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')
var stringReplaceWebpackPlugin = require("string-replace-webpack-plugin");

module.exports = {
  entry: {
    app: [
      './src/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'assets/[name].[hash:8].js',
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
              return '<%- html -%>'
            }
          }, {
            pattern: /<!-- state -->/g,
            replacement: function(match) {
              return '<script type="text/javascript">window._INITIAL_STATE_ = <%- JSON.stringify(state) %></script>'
            }
          }]
        })
      }
    ]
  },
  mode: 'development',
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'redux': 'Redux',
    'redux-thunk': 'ReduxThunk'
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: './views/index.ejs',
      template: './src/server/views/index.html',
      inject: true
    }),
    new stringReplaceWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}