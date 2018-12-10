const Webpack = require("webpack");
const rimraf = require("rimraf");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const path = require("path");
const autoprefixer = require("autoprefixer");

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
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ],
      },
      /*{
        test: /\.s?css$/,
        sideEffects: false,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
              minimize: true,
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [autoprefixer]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },*/
      {
        exclude: [/\.(js|jsx|mjs|ts|tsx|scss|css|html|json)$/],
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
    // new MiniCssExtractPlugin({
    //   filename: `${hashFormat}[name].css`
    // }),
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
