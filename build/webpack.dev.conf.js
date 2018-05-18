var path = require('path')
var webpack = require('webpack')
var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000',
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
    extensions: ['.js', '.jsx', '.json']
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
    'highcharts': 'Highcharts'
  },
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      '__SERVER__': '"/api"',
      '__TERMINAL__': '"browser"'
    }),
    new htmlWebpackPlugin({
      inject: true,
      template: './src/server/views/index.html',
      favicon: './src/assets/baidu.ico'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}