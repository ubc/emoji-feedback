const path = require('path')
const merge = require('webpack-merge')
const config = require('./webpack.config')

module.exports = merge(config, {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    library: 'emojiFeedback',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  mode: 'production'
})
