const path = require('path');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: "./main.js.map",
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: __dirname,
          from: "./src/html/*.html",
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin(),
    ],
  },
};
