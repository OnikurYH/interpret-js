const webpack = require("webpack");
const path = require("path");

const MAIN_FILE = path.resolve(__dirname, "src", "interpret");

function commonConfig () {
  let config = {};

  config.entry = {
    "interpret": MAIN_FILE,
    "interpret.min": MAIN_FILE
  };
  //config.entry[`${__dirname}/examples/js/interpret.min`] = MAIN_FILE;

  config.devtool = "source-map";

  config.resolve = {
    root: path.resolve(__dirname, "src")
  };

  config.output = {
    libraryTarget: "window",
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
}

module.exports = (function () {
  
  let dist = commonConfig();
  let examples = commonConfig();
  delete examples.entry["interpret"];
  delete examples.devtool;
  examples.output.path = path.resolve(__dirname, "examples", "lib");

  return [ dist, examples ];
})();