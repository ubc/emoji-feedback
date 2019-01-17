const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: 'index.html',
  filename: 'index.html',
  inject: 'body'
})
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    library: 'emojiFeedback',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: {
    port: 8080
  },
  plugins: [HtmlWebpackPluginConfig]
}
