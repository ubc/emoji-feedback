const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devtool: 'inline-source-map'
})
