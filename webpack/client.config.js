const Webpack = require("webpack");
const rimraf = require("rimraf");
const ManifestPlugin = require("webpack-manifest-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require("path");

const IS_DEV_SERVER = process.argv[1].indexOf('webpack-dev-server') >= 0;
const chunkHashFormat = IS_DEV_SERVER ? '' : "[chunkhash:10].";
const hashFormat = IS_DEV_SERVER ? '' : "[hash:10].";
const outputPath = path.resolve(__dirname, '../build/static');

rimraf.sync(outputPath);

const settings = {
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, '../src/index.client.tsx'),
  },
  output: {
    path: outputPath,
    publicPath: '/',
    filename: `${chunkHashFormat}[name].js`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'scss': path.resolve(__dirname, '../src/assets/scss')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        sideEffects: false,
      },
      {
        exclude: [/\.(js|jsx|mjs|ts|tsx|html|json)$/],
        loader: "file-loader",
        options: {
          name: `${hashFormat}[name].[ext]`,
          outputPath: '',
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new Webpack.HashedModuleIdsPlugin(),
    new ManifestPlugin({
      fileName: path.resolve(
        __dirname,
        "../build/assets-manifest.json"
      )
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
};

module.exports = settings;
