var path = require('path')
var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var webpackNodeExternals = require('webpack-node-externals')
var htmlWebpackPlugin = require('html-webpack-plugin')
var stringReplaceWebpackPlugin = require("string-replace-webpack-plugin");
var cleanWebpackPlugin = require('clean-webpack-plugin')

var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin')
var CompressionWebpackPlugin = require('compression-webpack-plugin')
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// var uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

var assets = './assets'
var distDir = path.resolve(__dirname, '../dist')
var assetsPath = function (filename) {
  return path.join(assets, filename)
}

var commonOptions = {
  output: {
    path: distDir
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  }
}

var clientOptions = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name][hash:8].js',
    publicPath: 'assets'
  },
  module: {
    rules: [
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
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        }),
        include: [path.resolve(__dirname, '../src')]
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
    'axios': 'axios',
    'moment': 'moment',
    'antd': 'antd',
    'highcharts': 'highcharts',
    'draft-js': 'Draft'
  },

  // devtool: '#source-map',
  // stats: {
  //   entrypoints: true
  // },
  plugins: [
    new webpack.DefinePlugin({
      '__SERVER__': '"https://t.server.wisbetter.com"',
      '__TERMINAL__': '"browser"'
    }),
    new BabelMinifyWebpackPlugin({
      consecutiveAdds: false,
      removeConsole: true
    }, {
        comments: false
      }),
    new ExtractTextWebpackPlugin({
      filename: assetsPath('css/[name].[id].css')
    }),
    new OptimizeCssAssetsWebpackPlugin({
      cssProcessorOptions: {
        safe: true
      },
      discardComments: {
        removeAll: true
      }
    }),
    new htmlWebpackPlugin({
      filename: './views/index.ejs',
      template: './src/server/views/index.html',
      inject: true
      // minify: {
      //   minifyCSS: true,
      //   minifyJS: true,
      //   removeComments: true,
      //   removeAttributeQuotes: true,
      //   collapseWhitespace: true
      // },
      // hash: true,
      // cache: true,
      // showErrors: false,
      // chunksSortMode: 'dependency'
    }),
    new stringReplaceWebpackPlugin(),
    // new uglifyjsWebpackPlugin(),
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
    // new cleanWebpackPlugin(distDir, {
    //   root: process.cwd()
    // }),
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
  webpackMerge(commonOptions, clientOptions)
  // webpackMerge(commonOptions, serverOptions)
]