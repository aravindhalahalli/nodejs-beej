const merge = require("webpack-merge");
const { commonConfig } = require("./webpack.config");

const devConfig = {
  output: {
    filename: "[name].bundle.js",
  },
  mode: "development",
};

module.exports = merge(commonConfig, devConfig);
