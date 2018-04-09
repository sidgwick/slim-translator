var webpack = require("webpack");
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
  resolve: {
    alias: {
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
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
            '@babel/preset-react',
          ],
          "plugins": [
            ["@babel/plugin-proposal-object-rest-spread"],
            //['@babel/plugin-transform-react-jsx', {"pragma": "h"}],
          ]
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
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
    })
  ],
};

