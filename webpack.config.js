var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".production.env" : ".env"
});

const ENV = process.env.NODE_ENV || "development";
const sourcePath = path.join(__dirname, "./");

var _module = {
  rules: [
    {
      test: /\.(ico|jpg|jpeg|png|gif|otf|eot|ttf|woff|svg|less)/,
      loader: "file-loader"
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
      query: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        plugins: [["import", { libraryName: "antd", style: true }]]
      }
    },
    {
      test: /\.less$/,
      use: [
        "style-loader",
        { loader: "css-loader", options: { sourceMap: 1 } },
        "postcss-loader",
        "less-loader"
      ]
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
};

var resolve = {
  extensions: ["*", ".scss", ".js", ".json", ".jsx"],
  modules: [path.resolve(__dirname, "./node_modules"), "node_modules"],
  alias: {
    base: path.resolve(__dirname, "./src/"),
    pages: path.resolve(__dirname, "./src/pages"),
    routes: path.resolve(__dirname, "./src/routes"),
    layouts: path.resolve(__dirname, "./src/layouts"),
    components: path.resolve(__dirname, "./src/components"),
    styles: path.resolve(__dirname, "./src/assets/styles"),
    actions: path.resolve(__dirname, "./src/actions/"),
    assets: path.resolve(__dirname, "./src/assets/"),
    global_styles: path.resolve(__dirname, "./src/assets/styles/"),
    constants: path.resolve(__dirname, "./src/constants"),
    containers: path.resolve(__dirname, "./src/containers/"),
    modules: path.resolve(__dirname, "./src/components/modules"),
    build: path.resolve(__dirname, "./build"),
    reducers: path.resolve(__dirname, "./src/reducers"),
    jquery: path.resolve(__dirname, "node_modules") + "/jquery/src/jquery.js"
  }
};

var plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.LoaderOptionsPlugin({
    debug: true,
    options: {
      context: __dirname
    }
  }),
  new ExtractTextPlugin({
    filename: "style.[hash].css",
    disable: false,
    allChunks: true
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
];

// ===============

module.exports = function(env) {
  const isProd = ENV === "production";

  const envars = Object.keys(process.env).reduce((acc, curr) => {
    acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
    return acc;
  }, {});

  const plugins = [
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: isProd ? "style.[hash].css" : "style.css",
      disable: true,
      allChunks: true
    }),
    new webpack.DefinePlugin(envars),
    new webpack.NamedModulesPlugin()
  ];

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })
    );
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.LoaderOptionsPlugin({
        debug: true,
        options: {
          context: __dirname
        }
      })
    );
  }

  const devtool = isProd ? "source-map" : "eval";

  return [
    {
      devtool: devtool,
      context: sourcePath,
      name: "web",
      entry: {
        app: [
          "@babel/polyfill",
          "./src/index.js",
          "bootstrap/dist/css/bootstrap.css"
        ]
      },
      output: {
        path: path.join(__dirname, "build"),
        filename: isProd ? "bundle.[hash].js" : "bundle.js",
        publicPath: "/"
      },
      module: _module,
      optimization: {
        minimizer: [new UglifyJsPlugin()]
      },
      plugins: plugins.concat(
        new HtmlWebpackPlugin({
          template: path.resolve("./public/", "index.html"),
          // favicon: path.resolve("./src/", "assets/images/favicon.ico"),
          minify: {
            collapseWhitespace: true
          }
        }),
        new ManifestPlugin()
      ),
      performance: isProd && {
        //maxAssetSize: 100,
        //maxEntrypointSize: 300,
        hints: "warning"
      },
      stats: {
        colors: {
          green: "\u001b[32m"
        }
      },
      node: {
        fs: "empty",
        // child_process: 'empty',
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: false
      },
      resolve: resolve,
      devServer: {
        host: "localhost",
        port: process.env.PORT || 9000,
        contentBase: "./",
        historyApiFallback: true
      }
    },
    {
      devtool: devtool,
      context: sourcePath,
      target: "node",
      name: "server-side rendering",
      entry: {
        app: ["@babel/polyfill", "bootstrap/dist/css/bootstrap.css"]
      },
      node: { process: true },
      output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.server.js",
        publicPath: "/",
        libraryTarget: "commonjs2"
      },
      module: _module,
      plugins: plugins.concat([
        new webpack.NormalModuleReplacementPlugin(
          /node_modules\/axios\/lib\/adapters\/xhr\.js/,
          "./http.js"
        )
      ]),
      performance: isProd && {
        //maxAssetSize: 100,
        //maxEntrypointSize: 300,
        hints: "warning"
      },
      stats: {
        assets: true,
        children: true,
        chunks: true,
        hash: true,
        modules: true,
        publicPath: true,
        modulesSort: "field",
        logging: "info",
        timings: true,
        version: true,
        warnings: true,
        colors: {
          green: "\033[1;34m"
        }
      },
      resolve: resolve
    }
  ];
};
