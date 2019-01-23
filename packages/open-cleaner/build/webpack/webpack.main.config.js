const { resolve } = require('path')
const { smart: merge } = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = (env) => {
  return merge(base(env), {
    entry: {
      background: './main/background.ts'
    },
    output: {
      filename: '[name].js',
      path: resolve(process.cwd(), 'app')
    }
  })
}
