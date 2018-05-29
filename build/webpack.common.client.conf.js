var path = require('path')
var webpack = require('webpack')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
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
  plugins: [
    new webpack.DefinePlugin({
      '__TERMINAL__': '"browser"'
    })
  ]
}