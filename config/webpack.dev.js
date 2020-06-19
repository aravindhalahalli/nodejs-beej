const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const commonConfig = require('./webpack.config');
const { resolveRoot } = require('./utils');

const devConfig = {
  devtool: 'inline-source-map',
  entry: ['webpack/hot/poll?1000', resolveRoot('src/app.ts')],
  output: {
    filename: '[name].bundle.js',
  },
  mode: 'development',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  // Added in dev mode, as in prod mode, webpack handles this situation for us
  optimization: {
    usedExports: true,
  },
  watch: true,
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: { scripts: ['yarn run:dev'] },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

module.exports = merge.smart(commonConfig, devConfig);
