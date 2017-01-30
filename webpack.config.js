const webpack = require("webpack");
const path = require("path");

module.exports = (function () {
  const MAIN_FILE = path.resolve(__dirname, "src", "interpret");

  let config = {};

  config.entry = {
    "interpret": MAIN_FILE,
    "interpret.min": MAIN_FILE
  };

  config.devtool = "source-map";

  config.resolve = {
    root: path.resolve(__dirname, "src")
  };

  config.output = {
    libraryTarget: "var",
    library: "InterpretJS",
    filename: "[name].js",
    sourceMapFilename: "[file].map",
    path: path.resolve(__dirname, "dist")
  };

  config.module = {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: [ "es2015" ]
        }
      }
    ]
  };

  config.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ];

  return config;
})();