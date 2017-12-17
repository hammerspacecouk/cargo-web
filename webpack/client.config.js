const Webpack = require('webpack');
const Path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const settings = {
  entry: {
    app: Path.resolve(__dirname, '../src/client.tsx'),
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-modal',
      'moment',
    ]
  },
  output: {
    path: Path.resolve(__dirname, '../build/static'),
    publicPath: '/',
    filename: '[chunkhash].[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'scss': Path.resolve(__dirname, '../src/scss'),
    }
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use : [
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        })
      },
      {
        test: /\.(png|svg|ico)$/,
        loader: 'file-loader?name=[hash].[name].[ext]',
      },
    ],
  },
  plugins: [
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[chunkhash].vendor.js'
    }),
    new UglifyJSPlugin(),
    new ExtractTextPlugin('[contenthash].[name].css'),
    new OptimizeCssAssetsPlugin(),
    new ManifestPlugin({
      fileName : Path.resolve(__dirname, '../build/assets-manifest.json'),
    }),
  ]
};

module.exports = settings;
