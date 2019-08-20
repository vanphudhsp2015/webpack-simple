const path = require("path");
const HtmlPackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const htmlPlugin = new HtmlPackPlugin({
  template: path.resolve(__dirname, "./public", "index.html"),
  filename: "./index.html",
  hash: true
});
module.exports = {
  module: {
    rules: [
      {
        test: /\.(ico|jpg|jpeg|png|eot|ttf|woff|svg|less|css)/,
        loader: "file-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]"
              }
            }
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      layouts: path.resolve(__dirname, "./src/layouts"),
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
      routes: path.resolve(__dirname, "./src/routes"),
      styles: path.resolve(__dirname, "./src/assets/styles")
    }
  },
  plugins: [
    htmlPlugin,
    new Dotenv({ path: path.join(__dirname, ".env"), systemvars: true })
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public",
    hot: true,
    historyApiFallback: true,
    port: 9999,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      modulesSort: "field",
      logging: "info",
      timings: true,
      version: true,
      warnings: true,
      colors: {
        green: "\033[1;34m"
      }
    }
  }
};
