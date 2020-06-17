const nodeExternals = require("webpack-node-externals");
const { resolveRoot } = require("./utils");

module.exports = {
  entry: {
    app: resolveRoot("src/app.js"),
  },
  target: "node",
  externals: [nodeExternals()],
};
