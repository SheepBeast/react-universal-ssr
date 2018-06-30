var path = require('path')
var webpack = require('webpack')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
    alias: {
      actions: path.resolve(__dirname, '../src/actions/'),
      constants: path.resolve(__dirname, '../src/constants/'),
      api: path.resolve(__dirname, '../src/api/')
    }
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
    'highcharts': 'Highcharts',
    'prop-types': 'PropTypes'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__TERMINAL__': '"browser"',
      '__DEV_UPLOAD_URL__': '"http://localhost:8081/upload"',
      '__PROD_UPLOAD_URL__': '"http://112.74.162.225:8081/upload"'
    })
  ]
}