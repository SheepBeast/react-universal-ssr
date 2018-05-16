var path = require('path')
var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var webpackNodeExternals = require('webpack-node-externals')
var htmlWebpackPlugin = require('html-webpack-plugin')
var stringReplaceWebpackPlugin = require("string-replace-webpack-plugin");
var cleanWebpackPlugin = require('clean-webpack-plugin')

var distDir = path.resolve(__dirname, '../dist')

var commonOptions = {
  output: {
    path: distDir
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  mode: 'production',
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
    filename: 'assets/[name].[hash:8].js',
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
    new cleanWebpackPlugin(distDir, {
      root: process.cwd()
    }),
    new webpack.DefinePlugin({
      '__views': JSON.stringify(path.join(process.cwd(), './dist/views')),
      '__assets': JSON.stringify(path.join(process.cwd(), './dist/assets')),
      '__TERMINAL__': '"server"',
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]
}

module.exports = [
  webpackMerge(clientOptions, commonOptions),
  webpackMerge(serverOptions, commonOptions)
]