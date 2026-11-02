const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/html/index.html" },
        { from: "src/css/main.css" },
        { from: "src/data/backgrounds.json" },
        { from: "src/data/streams.json" },
        { from: "src/img/favicon.gif" },
      ],
    }),
  ],
};
