const Webpack = require("webpack");
const rimraf = require("rimraf");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        sideEffects: false,
      },
      {
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
      },
      {
        test: /\.(png|svg|ico|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: `${hashFormat}[name].[ext]`,
          sourceMap: true
        }
      }
    ]
  },
  plugins: [
    new Webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: `${hashFormat}[name].css`
    }),
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
