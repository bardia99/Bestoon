const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].min.css",
    }),
  ],
  entry: {
    index: "./src/js/index.js",
  },
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "js/[name].min.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: "babel-loader",
        include: __dirname + "/src",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "resolve-url-loader" },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
    ],
  },
  watch: true,
  mode: "development",
};
