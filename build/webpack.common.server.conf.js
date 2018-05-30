var Webpack = require('webpack')
var WebpackNodeExternals = require('webpack-node-externals')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    index: './src/server/index.js'
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'modules/js/[name].js'
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
              name: 'modules/img/[name].[hash:8].[ext]'
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
    new Webpack.DefinePlugin({
      '__TERMINAL__': '"server"'
    }),
    new MiniCssExtractPlugin({
      filename: 'modules/css/[name].css',
      chunkFilename: 'modules/css/[name].css'
    }),
  ]
}