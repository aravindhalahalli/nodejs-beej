const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config');

const devConfig = {
  devtool: 'inline-source-map',
  output: {
    filename: 'server.js',
  },
  mode: 'development',

  // Added in dev mode, as in prod mode, webpack handles this situation for us
  optimization: {
    usedExports: true,
  },
  watch: true,
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

module.exports = merge.smart(commonConfig, devConfig);
