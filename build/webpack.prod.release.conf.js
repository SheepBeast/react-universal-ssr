var path = require('path')

var Webpack = require('webpack')
var WebpackMerge = require('webpack-merge')
var WebpackNodeExternals = require('webpack-node-externals')
var StringReplaceWebpackPlugin = require("string-replace-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin')
var CompressionWebpackPlugin = require('compression-webpack-plugin')
var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

var assets = './assets'
var distDir = path.resolve(__dirname, '../dist')
var assetsPath = function (filename) {
  return path.join(assets, filename)
}

var COMMON_CLIENT_CONFIG = require('./webpack.common.client.conf')
var COMMON_SERVER_CONFIG = require('./webpack.common.server.conf')

var client_options = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'assets/js/[name].[hash:8].js',
    chunkFilename: 'assets/js/[name].[hash:8].js',
    publicPath: './'
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
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
        include: [path.resolve(__dirname, '../src')]
      }
    ]
  },
  performance: {
    hints: false
  },
  mode: 'production',
  // devtool: 'source-map', // 启动devtool时，项目内所有的Promise需要设置reject回调函数
  stats: {
    entrypoints: true
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin({
        cssProcessorOptions: {
          safe: true
        },
        discardComments: {
          removeAll: true
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          minChunks: 2
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      '__REMOTE_SERVER__': '"https://t.server.wisbetter.com"',
      '__MIDDLEWAVE_SERVER__': '"https://t.apartment.wisbetter.com"' // 112.74.162.225
    }),
    new Webpack.HashedModuleIdsPlugin(),
    new BabelMinifyWebpackPlugin({
      consecutiveAdds: false,
      removeConsole: true
    }, { comments: false }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[name].[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      filename: './views/index.ejs',
      template: './src/server/views/index.html',
      inject: true
    }),
    new StringReplaceWebpackPlugin()
  ]
}

var server_options = {
  output: {
    path: distDir
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(distDir, {
      root: process.cwd()
    }),
    new Webpack.DefinePlugin({
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
  WebpackMerge(COMMON_CLIENT_CONFIG, client_options),
  WebpackMerge(COMMON_SERVER_CONFIG, server_options)
]