const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  devServer: {
    port: 8080,
    compress: false,
    contentBase: resolve(__dirname, 'src'),
    publicPath: '/dist/'
  }
}