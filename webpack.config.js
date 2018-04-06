const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  node: {
    fs: "empty",
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-es2015',
            '@babel/preset-react'
          ],
        }
      }
    }],
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: "src/icons/*", to: "icons/[name].[ext]"},
      {from: "src/main.css", to: "[name].[ext]"},
      {from: "src/manifest.json", to: "[name].[ext]"},
      //], options)
    ]),
  ],
};

