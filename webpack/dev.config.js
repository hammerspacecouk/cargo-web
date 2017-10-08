const Path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const settings = {
  devtool: 'source-map',
  entry: {
    app: Path.resolve(__dirname, '../src/client.tsx'),
  },
  output: {
    path: Path.resolve(__dirname, '../build/static'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'scss': Path.resolve(__dirname, '../src/scss')
    }
  },
  devServer: {
    contentBase: Path.resolve(__dirname, '.'),
    port: 3000,
    allowedHosts: [
      'dev.planetcargo.live',
    ],
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    historyApiFallback: {
      index: '/',
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
          ]
        })
      },
      {
        test: /\.(png|svg|ico)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ]
};

module.exports = settings;
