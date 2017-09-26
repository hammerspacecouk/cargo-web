const Webpack = require('webpack');
const Path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const settings = {
  devtool: 'source-map',
  entry: {
    app: Path.resolve(__dirname, '../src/client.tsx'),
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
    ]
  },
  output: {
    path: Path.resolve(__dirname, '../dist/static'),
    publicPath: '/',
    filename: 'client.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'scss': Path.resolve(__dirname, '../src/scss')
    }
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['ts-loader']
      }
    ]
  },
  plugins: [
    // ensure we are production mode (for react etc)
    new Webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    }),
    new UglifyJSPlugin(),
  ]
};

module.exports = settings;