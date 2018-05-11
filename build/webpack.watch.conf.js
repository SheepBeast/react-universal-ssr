var path = require('path')
var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var webpackNodeExternals = require('webpack-node-externals')
var htmlWebpackPlugin = require('html-webpack-plugin')
var stringReplaceWebpackPlugin = require("string-replace-webpack-plugin");

var commonOptions = {
  output: {
    path: path.resolve(__dirname, '../cache')
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules/
  },
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
      }
    ]
  }
}

var clientOptions = {
  entry: {
    app: [
      './src/index.js'
    ]
  },
  output: {
    filename: 'assets/[name].[hash:4].js',
    chunkFilename: '[name].js',
    publicPath: ''
  },
  module: {
    rules: [
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
            replacement: function (match) {
              return '<%- html -%>'
            }
          }, {
            pattern: /<!-- state -->/g,
            replacement: function (match) {
              return '<script type="text/javascript">window._INITIAL_STATE_ = <%- JSON.stringify(state) %></script>'
            }
          }]
        })
      }
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'redux': 'Redux',
    'redux-thunk': 'ReduxThunk',
    'axios': 'axios'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__SERVER__': '"https://t.server.wisbetter.com"',
      '__TERMINAL__': '"browser"'
    }),
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

var serverOptions = {
  entry: {
    index: './src/server/index.js'
  },
  output: {
    filename: '[name].js'
  },
  target: 'node',
  externals: [webpackNodeExternals()],
  module: {
    rules: [
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
      '__views': JSON.stringify(path.join(process.cwd(), './cache/views')),
      '__assets': JSON.stringify(path.join(process.cwd(), './cache/assets')),
      '__TERMINAL__': '"server"',
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
  ]
}

module.exports = [
  webpackMerge(serverOptions, commonOptions),
  webpackMerge(clientOptions, commonOptions)
]