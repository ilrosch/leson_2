const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StatoscopePlugin = require("@statoscope/webpack-plugin").default;
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  mode: "development",
  entry: {
    about: "./src/pages/About.js",
    home: "./src/pages/Home.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true,
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new StatoscopePlugin({
      saveStatsTo: "stats.json",
      saveOnlyStats: false,
      open: false,
    }),
    new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },

  // @TODO optimizations
  optimization: {
    minimize: true,
    moduleIds: "deterministic",
    innerGraph: true,
    concatenateModules: true,
    // @TODO chunk for lodash
    // @TODO chunk for runtime
    splitChunks: {
      chunks: "all",
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  // @TODO lodash treeshaking
  // @TODO fallback for crypto
};
module.exports = config;
