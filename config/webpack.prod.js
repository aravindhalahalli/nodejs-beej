const merge = require('webpack-merge');
const commonConfig = require('./webpack.config');

module.exports = merge(commonConfig, {
  devtool: 'source-map',
  output: {
    filename: '[name].[contentHash].bundle.js',
  },
  mode: 'production',
  externals: [nodeExternals({})],
});
