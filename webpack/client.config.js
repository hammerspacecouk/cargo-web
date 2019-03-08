const Webpack = require("webpack");
const rimraf = require("rimraf");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");

const path = require("path");

const IS_DEV_SERVER = process.argv[1].indexOf("webpack-dev-server") >= 0;
const chunkHashFormat = IS_DEV_SERVER ? "" : "[chunkhash:10].";
const hashFormat = IS_DEV_SERVER ? "" : "[hash:10].";
const outputPath = path.resolve(__dirname, "../build/static");
const publicPath = `${process.env.STATIC_HOST || ""}/`;

rimraf.sync(outputPath);

const settings = {
  devServer: {
    index: "templates/index.html"
  },
  devtool: "source-map",
  entry: {
    app: path.resolve(__dirname, "../src/index.client.tsx")
  },
  output: {
    path: outputPath,
    publicPath,
    filename: `${chunkHashFormat}[name].js`
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "scss": path.resolve(__dirname, "../src/assets/scss")
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader?sourceMap",
        sideEffects: false
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          "css-loader",
          "resolve-url-loader"
        ]
      },
      {
        test: /\.(jpg|png|gif|woff2|woff)$/,
        loader: "file-loader",
        options: {
          name: `${hashFormat}[name].[ext]`,
          outputPath: "",
          publicPath
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig.json')
    }),
    new Webpack.HashedModuleIdsPlugin(),
    new ManifestPlugin({
      fileName: path.resolve(
        __dirname,
        "../build/assets-manifest.json"
      )
    }),
    new HtmlWebpackPlugin({
      template: "templates/index.html",
      filename: "html/index.html"
    }),
    new PreloadWebpackPlugin({
      rel: "preload",
      include: "allAssets",
      excludeHtmlNames: ["index.html"]
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};

module.exports = settings;
