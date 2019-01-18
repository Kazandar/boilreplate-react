const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

const config = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "bundle.[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader"
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },

  devServer: {
    hotOnly: true
  },

  plugins: [
    new CleanWebpackPlugin("public", {}),
    new MiniCssExtractPlugin({
      filename: "style.[contenthash].css"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./src/index.html",
      filename: "index.html"
    }),
    new WebpackMd5Hash()
  ]
};

module.exports = (env, argv) => {
  let isDevelopment = argv.mode === "development";
  if (isDevelopment) {
    config.devtool = "eval-sourcemap";
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.output.filename = "bundle.js";
    config.module.rules[1].use.splice(1, 1);
  }
  return config;
};
