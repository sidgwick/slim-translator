const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
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

