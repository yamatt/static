const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: "main.js.map",
    filename: 'main.js'
  }
};
