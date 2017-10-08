module.exports = {
  autoprefixer: {
    'browsers': ['> 2%']
  },
  // The plugins section is used by postcss-loader with webpack
  plugins: [
    require('autoprefixer')
  ]
};

