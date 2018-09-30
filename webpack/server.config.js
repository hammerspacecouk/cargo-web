const Webpack = require('webpack');
const Path = require('path');

const settings = {
  entry: {
    app: Path.resolve(__dirname, '../src/index.server.tsx')
  },
  target: 'node',
  output: {
    path: Path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: 'server.js',
    libraryTarget: 'commonjs-module'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        sideEffects: false,
      }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new Webpack.ProvidePlugin({
      'fetch': require.resolve('node-fetch')
    }),
  ],
  optimization: {
    minimize: false
  }
};

module.exports = settings;
