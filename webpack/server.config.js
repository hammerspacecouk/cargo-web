const path = require('path');

const settings = {
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, '../src/server.tsx')
  },
  target: "node",
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'server.js',
    libraryTarget: 'commonjs-module'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'scss': path.resolve(__dirname, '../src/scss')
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
    // new Webpack.DefinePlugin({
    //   'process.env':{
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
  ]
};

module.exports = settings;