const autoprefixer = require('autoprefixer') // eslint-disable-line  import/no-extraneous-dependencies
const cssnano = require('cssnano')
const mqpacker = require('css-mqpacker')

const config = {
  plugins: [autoprefixer, cssnano, mqpacker,],
}

module.exports = config
