const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { resolveRoot } = require('./utils');

module.exports = {
  entry: { server: resolveRoot('src/server.ts') },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@controllers': resolveRoot('src/controllers'),
      '@models': resolveRoot('./src/models'),
      '@routes': resolveRoot('./src/routes'),
      '@types': resolveRoot('./src/types'),
      '@utils': resolveRoot('./src/utils'),
    },
  },
  target: 'node',
  plugins: [new CleanWebpackPlugin()],
};
