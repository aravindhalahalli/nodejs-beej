const merge = require('webpack-merge');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const commonConfig = require('./webpack.config');

const devConfig = {
  output: {
    filename: '[name].bundle.js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  // Added in dev mode, as in prod mode, webpack handles this situation for us
  optimization: {
    usedExports: true,
  },
  watch: true,
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: { scripts: ['yarn run:dev'] },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
