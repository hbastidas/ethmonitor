const path = require('path');

module.exports = {
  entry: './src/monitor.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'ethmonitor.js',
    library: 'ethmonitor'
  }
};