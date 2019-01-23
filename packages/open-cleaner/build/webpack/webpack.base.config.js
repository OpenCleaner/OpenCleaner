const { join, resolve } = require('path')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const cwd = process.cwd()
const externals = require(resolve(cwd, 'package.json')).dependencies

module.exports = (env) => {
  const baseConfig = {
    mode: env,
    target: 'electron-main',
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [...Object.keys(externals || {})],
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      modules: [join(cwd, 'app'), 'node_modules']
    },
    output: {
      libraryTarget: 'commonjs2'
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          },
          exclude: [
            /node_modules/,
            resolve(cwd, 'renderer')
          ]
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: [
            /node_modules/,
            resolve(process.cwd(), 'renderer')
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new FriendlyErrorsWebpackPlugin()
    ]
  }

  return baseConfig
}
